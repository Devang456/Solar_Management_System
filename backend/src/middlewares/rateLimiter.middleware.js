import rateLimit from "express-rate-limit";

/**
 * Login Rate Limiter Middleware
 * Restricts client IP to a maximum of 5 login attempts per 15-minute window in production.
 * In development mode, threshold is set to 50 attempts to prevent accidental lockout during testing.
 */
export const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes window
    max: process.env.NODE_ENV === "production" ? 5 : 50,
    standardHeaders: true, // Return rate limit info in standard `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    validate: { xForwardedForHeader: false },
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many login attempts from this IP. Please try again after 15 minutes."
        });
    }
});

/**
 * Demo Login Rate Limiter Middleware
 * Allows portfolio evaluators/recruiters comfortable exploration without tripping the strict 5-attempt limit.
 */
export const demoRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.NODE_ENV === "production" ? 30 : 100,
    standardHeaders: true,
    legacyHeaders: false,
    validate: { xForwardedForHeader: false },
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many demo session requests from this IP. Please wait a moment and try again."
        });
    }
});
