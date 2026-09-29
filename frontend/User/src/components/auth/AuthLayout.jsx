import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import '../../styles/AuthLayout.css'

function AuthLayout({ children, title, description }) {
  return (
    <div className="auth-layout">
      <LeftPanel title={title} description={description} />
      <RightPanel>{children}</RightPanel>
    </div>
  )
}

export default AuthLayout
