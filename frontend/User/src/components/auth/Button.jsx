import '../../styles/Button.css'

function Button({ children, type = 'button', onClick, className = '', disabled = false }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`auth-button ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
