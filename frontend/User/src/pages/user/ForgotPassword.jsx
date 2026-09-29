import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/auth/Input'
import Button from '../../components/auth/Button'
import { sendPasswordReset } from '../../services/authService'
import { EMAIL_REGEX } from '../../utils/validation'
import emailIcon from '../../assets/icons/email.svg'
import '../../styles/ForgotPassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setEmail(e.target.value)
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!EMAIL_REGEX.test(email)) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const result = sendPasswordReset(email)
      setLoading(false)

      if (result.success) {
        setSuccess(result.message)
        // Log the reset token to console for demo purposes
        const requests = JSON.parse(localStorage.getItem('solar_reset_requests') || '[]')
        const lastRequest = requests[requests.length - 1]
        if (lastRequest) {
          console.log('Password Reset Token (Demo):', lastRequest.token)
        }
      } else {
        setError(result.message)
      }
    }, 600)
  }

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Monitor and manage your solar energy systems efficiently. Track performance, optimize usage, and maximize your energy savings."
    >
      <div className="forgot-container">
        <div className="forgot-header">
          <h2>Forgot Password?</h2>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
        </div>

        {error && <div className="auth-message auth-error">{error}</div>}
        {success && <div className="auth-message auth-success">{success}</div>}

        <form className="forgot-form" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={handleChange}
            icon={<img src={emailIcon} alt="email" width="20" height="20" />}
          />

          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>

        <div className="forgot-link">
          <p>
            Remember your password?
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ForgotPassword
