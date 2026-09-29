import '../../styles/RightPanel.css'

function RightPanel({ children }) {
  return (
    <div className="right-panel">
      <div className="right-panel-content">
        {children}
      </div>
    </div>
  )
}

export default RightPanel
