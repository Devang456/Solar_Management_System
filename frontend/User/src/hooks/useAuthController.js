import { useState, useCallback } from "react";
import * as authService from "../services/authService";

const useAuthController = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const result = authService.login(email, password);
      if (!result.success) {
        setError(result.message);
      }
      return result;
    } catch (err) {
      setError(err.message || "Login failed");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = authService.register(userData);
      if (!result.success) {
        setError(result.message);
      }
      return result;
    } catch (err) {
      setError(err.message || "Registration failed");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
  }, []);

  const sendPasswordReset = useCallback(async (email) => {
    setLoading(true);
    setError(null);
    try {
      const result = authService.sendPasswordReset(email);
      return result;
    } catch (err) {
      setError(err.message || "Password reset failed");
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  return {
    user: currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    sendPasswordReset,
    clearError,
  };
};

export default useAuthController;
