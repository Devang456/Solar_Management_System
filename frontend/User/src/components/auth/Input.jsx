import '../../styles/Input.css'

function Input({ label, type = 'text', placeholder, icon, value, onChange, name }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          className="input-field"
        />
      </div>
    </div>
  )
}

export default Input
