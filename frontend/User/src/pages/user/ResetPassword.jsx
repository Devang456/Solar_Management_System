import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import PasswordInput from '../../components/auth/PasswordInput'
import Button from '../../components/auth/Button'
import { resetPassword } from '../../services/authService'
import passwordIcon from '../../assets/icons/password.svg'
import '../../styles/ResetPassword.css'

const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=]).{8,}$/

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(true)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
    if (success) setSuccess('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!token) {
      setError('This reset link is invalid or has expired. Please request a new one.')
      setShowForm(false)
      return
    }
    if (!formData.password) {
      setError('Please enter your new password.')
      return
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      setError('Password must be at least 8 characters with uppercase, lowercase, number, and special character.')
      return
    }
    if (!formData.confirmPassword) {
      setError('Please confirm your new password.')
      return
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.')
      return
    }

    setLoading(true)

    setTimeout(() => {
      const result = resetPassword(token, formData.password)
      setLoading(false)

      if (result.success) {
        setSuccess(result.message)
        setShowForm(false)
        setTimeout(() => navigate('/login'), 3000)
      } else {
        setError(result.message)
        // An invalid/expired link can never succeed — hide the form so the
        // user requests a fresh link instead of retrying forever.
        setShowForm(false)
      }
    }, 600)
  }

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Monitor and manage your solar energy systems efficiently. Track performance, optimize usage, and maximize your energy savings."
    >
      <div className="reset-container">
        <div className="reset-header">
          <h2>Reset Password</h2>
          <p>Enter and confirm your new password below</p>
        </div>

        {error && <div className="auth-message auth-error">{error}</div>}
        {success && <div className="auth-message auth-success">{success}</div>}

        {showForm && (
          <form className="reset-form" onSubmit={handleSubmit}>
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              icon={<img src={passwordIcon} alt="password" width="20" height="20" />}
            />

            <PasswordInput
              label="Confirm Password"
              placeholder="Re-enter new password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              icon={<img src={passwordIcon} alt="password" width="20" height="20" />}
            />

            <ul className="reset-hints">
              <li className={formData.password.length >= 8 ? 'hint-pass' : ''}>At least 8 characters</li>
              <li className={/[A-Z]/.test(formData.password) ? 'hint-pass' : ''}>One uppercase letter</li>
              <li className={/[a-z]/.test(formData.password) ? 'hint-pass' : ''}>One lowercase letter</li>
              <li className={/\d/.test(formData.password) ? 'hint-pass' : ''}>One number</li>
              <li className={/[@$!%*?&^#()_\-+=]/.test(formData.password) ? 'hint-pass' : ''}>One special character</li>
            </ul>

            <Button type="submit" disabled={loading}>
              {loading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        )}

        <div className="reset-link">
          <p>
            Remember your password?
            <Link to="/login">Back to Sign In</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default ResetPassword
