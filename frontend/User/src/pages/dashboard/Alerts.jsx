import { useState, useEffect } from 'react'
import PageLoader from '../../components/common/PageLoader'

const API_BASE = import.meta.env?.VITE_API_URL || '/api'

const Icons = {
  Warning: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  Info: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
  Success: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  ),
}

const severityColors = {
  High: '#dc2626',
  Medium: '#d97706',
  Low: '#16a34a',
  Critical: '#dc2626',
}

function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let isMounted = true
    const fetchAlerts = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const res = await fetch(`${API_BASE}/ticket-support?limit=100`, { headers, credentials: 'include' })
        if (res.ok) {
          const json = await res.json()
          if (isMounted && json.data) {
            const mapped = json.data.map((t) => ({
              id: t._id || t.id,
              type: t.priority === 'High' || t.priority === 'Critical' ? 'warning' : 'info',
              message: `${t.subject || 'Support Ticket'} - ${t.description || t.status}`,
              time: t.createdAt ? new Date(t.createdAt).toLocaleDateString() : 'Recent',
              plant: t.ticketId || `TKT-${String(t._id || '').slice(-4)}`,
              severity: t.priority || 'Medium',
            }))
            setAlerts(mapped)
          }
        }
      } catch (err) {
        console.warn('Error fetching dynamic alerts:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchAlerts()
    return () => { isMounted = false }
  }, [])

  const filtered = filter === 'all' ? alerts : alerts.filter((a) => a.type === filter)

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Alerts & Notifications</h1>
          <p className="page-subtitle">Stay informed about your solar system status live from database.</p>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <h3>All Notifications ({filtered.length})</h3>
          <div className="filter-group" style={{ display: 'flex', gap: 8 }}>
            {['all', 'warning', 'info', 'success'].map((f) => (
              <button
                key={f}
                className={`filter-chip ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <PageLoader />
        ) : filtered.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#9ca3af' }}>
            No alerts or support notifications found.
          </div>
        ) : (
          <div className="alerts-list-full">
            {filtered.map((alert) => (
              <div key={alert.id} className={`alert-item-full ${alert.type}`}>
                <div className={`alert-icon-wrap-lg ${alert.type}`}>
                  {alert.type === 'warning' && <Icons.Warning />}
                  {alert.type === 'info' && <Icons.Info />}
                  {alert.type === 'success' && <Icons.Success />}
                </div>
                <div className="alert-content">
                  <p className="alert-message">{alert.message}</p>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <span className="alert-time">{alert.plant}</span>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
                <span
                  className="severity-badge"
                  style={{
                    background: `${severityColors[alert.severity] || '#6b7280'}15`,
                    color: severityColors[alert.severity] || '#6b7280',
                  }}
                >
                  {alert.severity}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Alerts
