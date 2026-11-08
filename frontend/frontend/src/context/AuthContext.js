import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  ROLES,
  getRoleLabel,
  hasPermission,
  canDo,
  getActions,
  getAccessibleModules,
  getStoredRolePermissions,
  setStoredRolePermissions,
  DEFAULT_ROLE_PERMISSIONS,
  STORAGE_PERMISSIONS_KEY,
  STORAGE_ROLES_KEY,
} from "../config/roles";

import { authAPI } from "../services/api";

// How often the session re-checks its permissions against the DATABASE.
// 2 minutes is ideal to avoid overloading free-tier backends (e.g. Render)
// while keeping permissions relatively fresh.
const PERMISSIONS_POLL_INTERVAL_MS = 120000;
const STORAGE_USER_KEY = "solar_user";

// True when at least one module grants at least one action. Used to detect an
// empty/deactivated matrix so it can never revoke Super Admin's core access.
const hasGrantedAction = (matrix) =>
  !!matrix &&
  typeof matrix === "object" &&
  Object.values(matrix).some(
    (actions) =>
      actions &&
      typeof actions === "object" &&
      Object.values(actions).some(Boolean)
  );

const buildUser = (data = {}) => {
  const userRole = data.role || ROLES.SUPER_ADMIN;

  // The backend returns the authoritative DB permission matrix (from the Role
  // collection). Persist it REPLACING any stale local entry — merging would let
  // leftover default modules bleed into a role that was granted zero or fewer
  // permissions, making the dashboard widgets visible to permission-less users.
  // NOTE: only treat a plain object as a matrix — buildUser is also called with
  // previously-built user objects whose `permissions` is a module-key ARRAY
  // (switchRole / roles-updated / updateUser), which must never overwrite the
  // stored matrix.
  if (data.permissions && typeof data.permissions === "object" && !Array.isArray(data.permissions)) {
    try {
      // Clone so persisting a server matrix never mutates the shared defaults
      // object returned by getStoredRolePermissions().
      const stored = { ...getStoredRolePermissions() };
      const incoming = data.permissions;
      // A missing/empty role matrix (e.g. the roles collection was never
      // seeded) must not lock Super Admin out of the app.
      if (userRole === ROLES.SUPER_ADMIN && !hasGrantedAction(incoming)) {
        stored[ROLES.SUPER_ADMIN] = DEFAULT_ROLE_PERMISSIONS[ROLES.SUPER_ADMIN];
      } else {
        stored[userRole] = incoming;
      }
      // Super Admin core access can never be lost.
      if (!hasGrantedAction(stored[ROLES.SUPER_ADMIN])) {
        stored[ROLES.SUPER_ADMIN] = DEFAULT_ROLE_PERMISSIONS[ROLES.SUPER_ADMIN];
      }
      setStoredRolePermissions(stored);
    } catch (e) {
      console.warn("Failed to persist server permission matrix", e);
    }
  }

  return {
    ...data,
    role: userRole,
    isDemo: !!(data.isDemo || userRole === ROLES.DEMO_VIEWER),
    roleLabel: getRoleLabel(userRole),
    permissions: getAccessibleModules(userRole),
    name: data.name || data.email?.split("@")[0] || "Admin",
  };
};

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(STORAGE_USER_KEY) : null;
      if (stored) {
        return buildUser(JSON.parse(stored));
      }
    } catch {}
    return null;
  });
  const [permissionsReady, setPermissionsReady] = useState(() => {
    // If a cached user session and token already exist, start as ready to prevent login redirects
    if (typeof window !== "undefined") {
      const hasToken = !!(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));
      const hasStoredUser = !!localStorage.getItem(STORAGE_USER_KEY);
      return hasToken && hasStoredUser;
    }
    return false;
  });

  // Rebuild the current user from the STORED roles list + permission matrix.
  const refreshUserFromStoredPermissions = useCallback(() => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updated = buildUser(prevUser);
      const sameRole = updated.role === prevUser.role;
      const sameModules =
        JSON.stringify(updated.permissions || []) ===
        JSON.stringify(prevUser.permissions || []);
      if (sameRole && sameModules) return prevUser;
      return updated;
    });
  }, []);

  // Same-tab dynamic roles/permissions updates (dispatched by the Roles &
  // Permissions module after every save).
  useEffect(() => {
    window.addEventListener("roles-updated", refreshUserFromStoredPermissions);
    return () => window.removeEventListener("roles-updated", refreshUserFromStoredPermissions);
  }, [refreshUserFromStoredPermissions]);

  // Cross-tab (SAME browser profile) updates: the browser fires a `storage`
  // event in every other tab when the permission matrix or roles list changes
  // in localStorage — instant lockout, no reload. The focus listener is a
  // safety net for background tabs whose storage events were throttled.
  // NOTE: incognito/other-browser windows have isolated localStorage, so the
  // database poll below covers those cases.
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === STORAGE_PERMISSIONS_KEY || e.key === STORAGE_ROLES_KEY) {
        refreshUserFromStoredPermissions();
      }
    };
    const handleFocus = () => refreshUserFromStoredPermissions();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleFocus);
    };
  }, [refreshUserFromStoredPermissions]);

  // Fetch the user's CURRENT permissions from the database (the source of
  // truth shared across every browser context) and rebuild the session when
  // they changed. The equality guard skips redundant updates.
  const syncPermissionsFromServer = useCallback(async () => {
    const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await authAPI.getProfile();
      if (res.data?.success && res.data?.user) {
        const refreshed = buildUser(res.data.user);
        try {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(refreshed));
        } catch {}
        setUser((prevUser) => {
          if (!prevUser) return refreshed;
          const sameRole = refreshed.role === prevUser.role;
          const sameModules =
            JSON.stringify(refreshed.permissions || []) ===
            JSON.stringify(prevUser.permissions || []);
          if (sameRole && sameModules) return prevUser;
          return refreshed;
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem(STORAGE_USER_KEY);
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setUser(null);
      } else {
        // Server unreachable or temporarily unavailable — keep the cached
        // session; the route guards still apply and the next tick will retry.
        // Suppress noisy console warnings for transient failures (503 during
        // DB reconnect, network hiccups, CORS preflight errors) so the
        // console stays clean for genuine issues.
        const status = err?.response?.status;
        const isTransient = status === 503 || status === 504 || status === 0;
        if (
          !isTransient &&
          err?.message !== "Network Error" &&
          err?.code !== "ERR_NETWORK"
        ) {
          console.warn("Failed to re-sync user permissions:", err.message);
        }
      }
    }
  }, []);

  // ── Live permission re-sync from the DATABASE ──
  // The localStorage storage-event sync above only reaches tabs of the SAME
  // browser profile. A Super Admin editing permissions in a normal tab while
  // the user is logged in inside an incognito window (or another browser)
  // never fires a storage event here. So also poll the profile endpoint on an
  // interval and whenever the window regains focus — when the role's
  // permissions are removed (or the role deactivated), the route guards
  // redirect to /admin/access-denied on the next tick, without a reload.
  // Polling is skipped while the tab is hidden (no wasted background
  // requests); it resumes immediately when the tab becomes visible again.
  const hasToken = typeof window !== "undefined" && !!(localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));
  const isLoggedIn = !!user && hasToken;
  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    // Dedupe: on tab return both `visibilitychange` and window `focus` fire,
    // which would otherwise trigger two identical profile requests back-to-back.
    let lastSyncAt = 0;

    const sync = () => {
      if (cancelled) return;
      // Skip background polling for hidden tabs — the sync fires on
      // visibilitychange/focus when the user comes back.
      if (typeof document !== "undefined" && document.visibilityState === "hidden") return;
      const now = Date.now();
      if (now - lastSyncAt < 1000) return;
      lastSyncAt = now;
      syncPermissionsFromServer();
    };

    const onVisible = () => {
      if (document.visibilityState === "visible") sync();
    };

    // Check immediately when the user returns to this tab.
    window.addEventListener("focus", sync);
    document.addEventListener("visibilitychange", onVisible);
    const intervalId = setInterval(sync, PERMISSIONS_POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", sync);
      document.removeEventListener("visibilitychange", onVisible);
      clearInterval(intervalId);
    };
  }, [isLoggedIn, syncPermissionsFromServer]);

  // Re-sync permissions from the database on mount so a persisted session
  // always reflects the role's CURRENT permissions.
  useEffect(() => {
    let cancelled = false;

    const pathname = typeof window !== "undefined" ? (window.location.pathname || "").toLowerCase() : "";
    const isPublicPage =
      pathname.includes("login") ||
      pathname.includes("forgot-password") ||
      pathname.includes("reset-password");

    if (isPublicPage) {
      setPermissionsReady(true);
      return;
    }

    const token = typeof window !== "undefined" && (localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken"));
    if (!token) {
      setPermissionsReady(true);
      return;
    }

    (async () => {
      await syncPermissionsFromServer();
      if (!cancelled) setPermissionsReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [syncPermissionsFromServer]);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const data = response.data;
      if (!data.success) {
        return { success: false, message: data.message };
      } else {
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        }
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        const userData = buildUser(data.user);
        try {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
        } catch {}
        setUser(userData);
        setPermissionsReady(true);
        return { success: true, message: data.message, user: userData };
      }
    } catch (error) {
      const message = error.response?.data?.message || (error.message === "Network Error" ? "Unable to connect to backend server. Please verify the backend is running on port 5000." : error.message);
      return { success: false, message };
    }
  };

  const demoLogin = async () => {
    try {
      const response = await authAPI.demoLogin();
      const data = response.data;
      if (!data.success) {
        return { success: false, message: data.message };
      } else {
        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        }
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
        }
        const userData = buildUser(data.user);
        try {
          localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(userData));
        } catch {}
        setUser(userData);
        setPermissionsReady(true);
        return { success: true, message: data.message, user: userData };
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.message === "Network Error"
          ? "Unable to connect to backend server. Please verify the backend is running."
          : error.message);
      return { success: false, message };
    }
  };

  // Purge legacy localStorage tokens on startup — session is managed via cookies and Bearer tokens
  useEffect(() => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("userToken");
    } catch {}
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setPermissionsReady(true);
    try {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem(STORAGE_USER_KEY);
      sessionStorage.clear();
    } catch {}

    authAPI.logout().catch((err) => {
      logger.warn("Server-side logout failed:", err?.message);
    });
  }, []);

  /** Merge profile updates into the current user (context state) */
  const updateUser = (updates = {}) => {
    setUser((prevUser) => {
      if (!prevUser) return prevUser;
      const updated = buildUser({ ...prevUser, ...updates });
      try {
        localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const switchRole = (newRoleKey) => {
    if (!user) return;
    const updatedUser = buildUser({ ...user, role: newRoleKey });
    setUser(updatedUser);
  };

  const canAccess = (moduleKey) => {
    if (!user) return false;
    return hasPermission(user.role, moduleKey);
  };

  /** Check if the current user can perform `action` on `module` */
  const checkAction = (moduleKey, actionKey) => {
    if (!user) return false;
    return canDo(user.role, moduleKey, actionKey);
  };

  /** Get allowed actions for a module for the current user */
  const getUserActions = (moduleKey) => {
    if (!user) return [];
    return getActions(user.role, moduleKey);
  };

  const isDemo = !!(user?.isDemo || user?.role === ROLES.DEMO_VIEWER);

  // Recruiter Demo Mode - Interactive UI safeguards
  // Enables visitors to freely inspect forms, tabs, inputs and modules
  // while preventing mutations to protect live portfolio data.
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (isDemo) {
      document.body.classList.add("demo-mode-active");
      document.body.setAttribute("data-demo-mode", "true");
    } else {
      document.body.classList.remove("demo-mode-active");
      document.body.removeAttribute("data-demo-mode");
    }

    if (!isDemo) return;

    const handleFormSubmit = (e) => {
      const form = e.target;
      // Do not block authentication forms (login / password reset)
      if (
        form &&
        (form.classList.contains("login-form") ||
          form.classList.contains("forgot-form") ||
          form.closest(".login-card") ||
          form.closest(".forgot-card"))
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === "function") {
        e.stopImmediatePropagation();
      }

      window.dispatchEvent(
        new CustomEvent("solar-toast", {
          detail: {
            type: "warning",
            message: "Demo Mode: Form inputs are fully interactive for evaluation, but saving is disabled to protect live portfolio data.",
            duration: 4000,
          },
        })
      );
    };

    document.addEventListener("submit", handleFormSubmit, true);
    return () => {
      document.removeEventListener("submit", handleFormSubmit, true);
    };
  }, [isDemo]);

  const value = {
    user,
    isDemo,
    login,
    demoLogin,
    logout,
    switchRole,
    updateUser,
    canAccess,
    canDo: checkAction,
    getUserActions,
    isAuthenticated: !!user,
    permissionsReady,
    role: user?.role || null,
    roleLabel: user?.roleLabel || null,
    permissions: user?.permissions || [],
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
