import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/auth/Input'
import PasswordInput from '../../components/auth/PasswordInput'
import Checkbox from '../../components/auth/Checkbox'
import Button from '../../components/auth/Button'
import { login } from '../../services/authService'
import { EMAIL_REGEX } from '../../utils/validation'
import emailIcon from '../../assets/icons/email.svg'
import passwordIcon from '../../assets/icons/password.svg'
import '../../styles/Login.css'

function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email.trim()) {
      setError('Please enter your email address.')
      return
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!formData.password) {
      setError('Please enter your password.')
      return
    }

    setLoading(true)

    // Simulate network delay
    setTimeout(() => {
      const result = login(formData.email, formData.password)
      setLoading(false)

      if (result.success) {
        navigate('/dashboard')
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
      <div className="login-container">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Sign in to continue to Solar Management System</p>
        </div>

        {error && <div className="auth-message auth-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<img src={emailIcon} alt="email" width="20" height="20" />}
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            icon={<img src={passwordIcon} alt="password" width="20" height="20" />}
          />

          <div className="login-options">
            <Checkbox
              label="Remember me"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <Link to="/forgot-password" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        <div className="register-link">
          <p>
            Don't have an account?
            <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Login
