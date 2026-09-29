import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import ForgotPassword from '../pages/user/ForgotPassword'
import ResetPassword from '../pages/user/ResetPassword'
import Dashboard from '../pages/dashboard/Dashboard'
import DashOverview from '../pages/dashboard/DashOverview'
import Plants from '../pages/dashboard/Plants'
import Analytics from '../pages/dashboard/Analytics'
import Alerts from '../pages/dashboard/Alerts'
import Reports from '../pages/dashboard/Reports'
// import Settings from '../pages/dashboard/Settings'
import ProtectedRoute from './ProtectedRoute'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashOverview />} />
          <Route path="plants" element={<Plants />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          {/* <Route path="settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
