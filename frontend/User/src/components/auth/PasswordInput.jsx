import { useState } from 'react'
import eyeIcon from '../../assets/icons/eye.svg'
import eyeOffIcon from '../../assets/icons/eye-off.svg'
import '../../styles/Input.css'
import '../../styles/PasswordInput.css'

function PasswordInput({ label, placeholder, icon, value, onChange, name }) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="input-field"
        />
        <button
          type="button"
          className="toggle-password"
          onClick={() => setShowPassword(!showPassword)}
        >
          <img src={showPassword ? eyeOffIcon : eyeIcon} alt="toggle" width="20" height="20" />
        </button>
      </div>
    </div>
  )
}

export default PasswordInput
