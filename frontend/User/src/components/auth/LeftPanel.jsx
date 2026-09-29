import sunIcon from '../../assets/icons/sun.svg'
import '../../styles/LeftPanel.css'

function LeftPanel({ title, description }) {
  return (
    <div className="left-panel">
      <div className="left-panel-content">
        <div className="brand">
          <div className="brand-icon">
            <img src={sunIcon} alt="solar" width="28" height="28" />
          </div>
          <span className="brand-name">Solar_Management_System</span>
        </div>

        <div className="welcome-text">
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>

      <div className="left-footer">
        <p>&copy; 2026 Solar Management System. All rights reserved.</p>
      </div>
    </div>
  )
}

export default LeftPanel
