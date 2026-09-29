import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import Input from '../../components/auth/Input'
import PasswordInput from '../../components/auth/PasswordInput'
import Checkbox from '../../components/auth/Checkbox'
import Button from '../../components/auth/Button'
import { register } from '../../services/authService'
import { EMAIL_REGEX } from '../../utils/validation'
import userIcon from '../../assets/icons/user.svg'
import emailIcon from '../../assets/icons/email.svg'
import phoneIcon from '../../assets/icons/phone.svg'
import passwordIcon from '../../assets/icons/password.svg'
import '../../styles/Register.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Clear messages when user starts typing
    if (error) setError('')
    if (success) setSuccess('')
  }

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      return 'Please enter your full name.'
    }
    if (!formData.email.trim()) {
      return 'Please enter your email address.'
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      return 'Please enter a valid email address.'
    }
    if (!formData.phone.trim()) {
      return 'Please enter your phone number.'
    }
    if (!formData.phone.match(/^[+]?[\d\s()-]{7,20}$/)) {
      return 'Please enter a valid phone number.'
    }
    if (!formData.password) {
      return 'Please create a password.'
    }
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters.'
    }
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match.'
    }
    if (!formData.agreeTerms) {
      return 'Please agree to the Terms & Conditions.'
    }
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)

    // Simulate network delay for realistic feedback
    setTimeout(() => {
      const result = register({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      })

      setLoading(false)

      if (result.success) {
        setSuccess(result.message)
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: '',
          agreeTerms: false
        })
        // Redirect to login after a brief delay
        setTimeout(() => navigate('/login'), 1500)
      } else {
        setError(result.message)
      }
    }, 600)
  }

  return (
    <AuthLayout
      title="Start Your Solar Journey"
      description="Register today to access real-time monitoring, system insights, and complete control of your solar infrastructure through a secure management platform."
    >
      <div className="register-container">
        <div className="register-header">
          <h2>Create Account</h2>
          <p>Sign up to get started with Solar Management System</p>
        </div>

        {error && <div className="auth-message auth-error">{error}</div>}
        {success && <div className="auth-message auth-success">{success}</div>}

        <form className="register-form" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            icon={<img src={userIcon} alt="user" width="20" height="20" />}
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            icon={<img src={emailIcon} alt="email" width="20" height="20" />}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Enter your phone number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            icon={<img src={phoneIcon} alt="phone" width="20" height="20" />}
          />

          <PasswordInput
            label="Password"
            placeholder="Create a password (min. 6 characters)"
            name="password"
            value={formData.password}
            onChange={handleChange}
            icon={<img src={passwordIcon} alt="password" width="20" height="20" />}
          />

          <PasswordInput
            label="Confirm Password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={<img src={passwordIcon} alt="password" width="20" height="20" />}
          />

          <div className="register-options">
            <Checkbox
              label="I agree to the Terms & Conditions"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        <div className="register-link">
          <p>
            Already have an account?
            <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Register
