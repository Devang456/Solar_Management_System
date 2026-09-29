const USERS_KEY = 'solar_users'
const SESSION_KEY = 'solar_session'

/**
 * Get all registered users from Local Storage
 */
const getUsers = () => {
  try {
    const data = localStorage.getItem(USERS_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

/**
 * Save users array to Local Storage
 */
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

/**
 * Register a new user
 * @param {{ fullName: string, email: string, phone: string, password: string }} userData
 * @returns {{ success: boolean, message: string }}
 */
export const register = (userData) => {
  const users = getUsers()

  // Check if email already exists
  if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
    return { success: false, message: 'An account with this email already exists.' }
  }

  const newUser = {
    id: Date.now().toString(),
    fullName: userData.fullName.trim(),
    email: userData.email.toLowerCase().trim(),
    phone: userData.phone.trim(),
    password: userData.password,
    createdAt: new Date().toISOString()
  }

  users.push(newUser)
  saveUsers(users)

  return { success: true, message: 'Account created successfully! Please sign in.' }
}

/**
 * Authenticate user with email and password
 * @param {string} email
 * @param {string} password
 * @returns {{ success: boolean, message: string, user?: object }}
 */
export const login = (email, password) => {
  const users = getUsers()
  const user = users.find(u => u.email === email.toLowerCase().trim())

  if (!user) {
    return { success: false, message: 'No account found with this email address.' }
  }

  if (user.password !== password) {
    return { success: false, message: 'Incorrect password. Please try again.' }
  }

  // Save session
  const session = {
    userId: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    loggedInAt: new Date().toISOString()
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))

  return { success: true, message: 'Login successful!', user: session }
}

/**
 * Log out the current user
 */
export const logout = () => {
  localStorage.removeItem(SESSION_KEY)
}

/**
 * Check if a user is currently authenticated
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  return localStorage.getItem(SESSION_KEY) !== null
}

/**
 * Get the currently logged-in user's session data
 * @returns {object|null}
 */
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(SESSION_KEY)
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

/**
 * Send password reset (stores a reset token for the email)
 * @param {string} email
 * @returns {{ success: boolean, message: string }}
 */
export const sendPasswordReset = (email) => {
  const users = getUsers()
  const user = users.find(u => u.email === email.toLowerCase().trim())

  if (!user) {
    return { success: false, message: 'No account found with this email address.' }
  }

  // In a real app, this would send an email. For Local Storage demo,
  // we store a reset request flag.
  const resetRequests = JSON.parse(localStorage.getItem('solar_reset_requests') || '[]')
  resetRequests.push({
    email: user.email,
    requestedAt: new Date().toISOString(),
    token: Date.now().toString(36) + Math.random().toString(36).slice(2)
  })
  localStorage.setItem('solar_reset_requests', JSON.stringify(resetRequests))

  return { success: true, message: 'Password reset link sent to your email. (Demo: Check console for the reset token.)' }
}

/**
 * Reset a user's password using a valid reset token
 * @param {string} token - reset token from the password reset request
 * @param {string} newPassword
 * @returns {{ success: boolean, message: string }}
 */
export const resetPassword = (token, newPassword) => {
  const resetRequests = JSON.parse(localStorage.getItem('solar_reset_requests') || '[]')
  const request = resetRequests.find(r => r.token === token)

  if (!request) {
    return { success: false, message: 'This reset link is invalid or has expired. Please request a new one.' }
  }

  const users = getUsers()
  const userIndex = users.findIndex(u => u.email === request.email)

  if (userIndex === -1) {
    return { success: false, message: 'No account found for this reset request.' }
  }

  users[userIndex].password = newPassword
  saveUsers(users)

  // Consume the token so it can only be used once
  localStorage.setItem(
    'solar_reset_requests',
    JSON.stringify(resetRequests.filter(r => r.token !== token))
  )

  return { success: true, message: 'Password reset successfully! You can now sign in.' }
}
