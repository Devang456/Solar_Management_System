/**
 * Centralized Single Source of Truth for User App Validation Regexes & Helpers
 */

export const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;
export const EMAIL_REGEX = /^[A-Za-z0-9]+([._%+-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
export const PHONE_REGEX = /^\+?[1-9]\d{9,14}$/;
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,32}$/;
