import { useState, useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import PageLoader from '../../components/common/PageLoader'

const API_BASE = import.meta.env?.VITE_API_URL || '/api'

const Icons = {
  Sun: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Plant: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 22v-4" /><path d="M12 12v4" /><path d="M12 4v4" />
      <path d="M18 6a6 6 0 0 0-12 0" /><path d="M12 12a6 6 0 0 0 4.24-1.76" /><path d="M12 12a6 6 0 0 1-4.24-1.76" />
    </svg>
  ),
  Analytics: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  Bolt: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
}

function DashOverview() {
  const { currentUser } = useOutletContext()
  const navigate = useNavigate()

  const [installations, setInstallations] = useState([])
  const [tickets, setTickets] = useState([])
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}

        const [instRes, ticketRes, invRes] = await Promise.allSettled([
          fetch(`${API_BASE}/installations?limit=100`, { headers, credentials: 'include' }).then((res) => res.ok ? res.json() : null),
          fetch(`${API_BASE}/ticket-support?limit=100`, { headers, credentials: 'include' }).then((res) => res.ok ? res.json() : null),
          fetch(`${API_BASE}/invoices?limit=100`, { headers, credentials: 'include' }).then((res) => res.ok ? res.json() : null),
        ])

        if (!isMounted) return

        if (instRes.status === 'fulfilled' && instRes.value?.data) {
          setInstallations(instRes.value.data)
        }
        if (ticketRes.status === 'fulfilled' && ticketRes.value?.data) {
          setTickets(ticketRes.value.data)
        }
        if (invRes.status === 'fulfilled' && invRes.value?.data) {
          setInvoices(invRes.value.data)
        }
      } catch (err) {
        console.warn('Error fetching dynamic user dashboard data:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchData()
    return () => { isMounted = false }
  }, [])

  // Dynamic stat calculations
  const totalCapacityKw = installations.reduce(
    (sum, inst) => sum + (Number(inst.systemCapacityKw || inst.capacity) || 5),
    0
  )
  const totalEnergyKwh = totalCapacityKw ? Math.round(totalCapacityKw * 120) : 0
  const activeSystemsCount = installations.filter(
    (inst) => inst.installationStatus === 'Completed' || inst.status === 'active'
  ).length
  const totalInvoiced = invoices.reduce((sum, inv) => sum + (Number(inv.totalAmount) || 0), 0)

  // Dynamic monthly generation buckets from DB records
  const lastMonths = []
  const now = new Date()
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const label = d.toLocaleString('en', { month: 'short' })
    const monthInstalls = installations.filter((inst) => {
      const dateVal = inst.createdAt || inst.installationDate
      if (!dateVal) return false
      const dateObj = new Date(dateVal)
      return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}` === monthKey
    })
    const monthEnergy = monthInstalls.reduce(
      (sum, inst) => sum + (Number(inst.systemCapacityKw || 5) * 120),
      0
    )
    lastMonths.push({ month: label, energy: monthEnergy })
  }

  const maxEnergy = Math.max(...lastMonths.map((d) => d.energy), 1)
  const solarPct = installations.length > 0 ? 100 : 0
  const gridPct = installations.length > 0 ? 0 : 100

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">
            Welcome back, {currentUser?.fullName?.split(' ')[0] || 'User'}! Here&apos;s your live solar energy overview.
          </p>
        </div>
        <div className="page-actions">
          <span className="date-badge"><Icons.Bolt /> Live DB Data</span>
        </div>
      </div>

      {loading ? (
        <PageLoader />
      ) : (
        <>
          <div className="stats-grid">
            {[
              { icon: <Icons.Sun />, cls: 'stat-icon-energy', label: 'Total Energy', value: `${totalEnergyKwh.toLocaleString()} kWh`, trend: 'up', pct: installations.length > 0 ? '+100%' : '0%' },
              { icon: <Icons.Plant />, cls: 'stat-icon-panels', label: 'Active Systems', value: activeSystemsCount.toString(), trend: 'up', pct: `${activeSystemsCount}` },
              { icon: <Icons.Bolt />, cls: 'stat-icon-savings', label: 'Invoiced Value', value: `₹${totalInvoiced.toLocaleString('en-IN')}`, trend: 'up', pct: 'Live' },
              { icon: <Icons.Analytics />, cls: 'stat-icon-efficiency', label: 'System Capacity', value: `${totalCapacityKw} kW`, trend: 'up', pct: 'Capacity' },
            ].map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-card-header">
                  <span className="stat-label">{s.label}</span>
                  <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                </div>
                <span className="stat-value">{s.value}</span>
                <div className={`stat-trend ${s.trend}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points={s.trend === 'up' ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                  </svg>
                  <span>{s.pct}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="charts-row">
            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Energy Generation</h3>
                <span className="chart-period">Last 6 months</span>
              </div>
              <div className="bar-chart">
                {lastMonths.map((item) => (
                  <div key={item.month} className="bar-group">
                    <div className="bar-wrapper">
                      <div className="bar" style={{ height: `${(item.energy / maxEnergy) * 100}%` }}>
                        <span className="bar-tooltip">{item.energy.toLocaleString()} kWh</span>
                      </div>
                    </div>
                    <span className="bar-label">{item.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-card-header">
                <h3>Energy Distribution</h3>
                <span className="chart-period">This month</span>
              </div>
              <div className="donut-container">
                <div className="donut-chart">
                  <svg width="160" height="160" viewBox="0 0 36 36">
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e8f5e9" strokeWidth="3" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#0f4c3a" strokeWidth="3" strokeDasharray={`${solarPct} ${100 - solarPct}`} strokeLinecap="round" />
                    <text x="18" y="18" textAnchor="middle" dominantBaseline="central" fontSize="8" fontWeight="700" fill="#1f2937">{solarPct}%</text>
                    <text x="18" y="24" textAnchor="middle" dominantBaseline="central" fontSize="3.5" fill="#6b7280">Solar</text>
                  </svg>
                </div>
                <div className="donut-legend">
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#0f4c3a' }}></span>
                    <span>Solar Energy</span>
                    <span className="legend-value">{solarPct}%</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot" style={{ background: '#ffb74d' }}></span>
                    <span>Grid Power</span>
                    <span className="legend-value">{gridPct}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom-row">
            <div className="section-card plants-main">
              <div className="section-card-header">
                <h3>Plant Status</h3>
                <button className="view-all-btn" onClick={() => navigate('/dashboard/plants')}>View All</button>
              </div>
              <div className="table-wrap">
                <table className="plant-table">
                  <thead>
                    <tr><th>Plant / System</th><th>Location</th><th>Capacity</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {installations.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', padding: '24px', color: '#9ca3af' }}>
                          No installation records found in the database.
                        </td>
                      </tr>
                    ) : (
                      installations.slice(0, 5).map((inst, index) => (
                        <tr key={inst._id || inst.id || index}>
                          <td className="plant-name">{inst.customerName || inst.systemType || `Solar Plant #${index + 1}`}</td>
                          <td>{inst.projectLocation || inst.city || inst.address || '—'}</td>
                          <td>{inst.systemCapacityKw || inst.capacity ? `${inst.systemCapacityKw || inst.capacity} kW` : '—'}</td>
                          <td>
                            <span className={`status-badge ${inst.installationStatus === 'Completed' ? 'active' : 'pending'}`}>
                              {inst.installationStatus || inst.status || 'Pending'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bottom-right-col">
              <div className="section-card">
                <div className="section-card-header">
                  <h3>Recent Support Tickets</h3>
                  <button className="view-all-btn" onClick={() => navigate('/dashboard/alerts')}>View All</button>
                </div>
                <div className="alerts-list">
                  {tickets.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>
                      No active tickets recorded.
                    </div>
                  ) : (
                    tickets.slice(0, 4).map((t, i) => (
                      <div key={t._id || i} className="alert-item info">
                        <div className="alert-icon-wrap">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                          </svg>
                        </div>
                        <div className="alert-content">
                          <p className="alert-message">{t.subject || t.title || 'Support Request'}</p>
                          <span className="alert-time">{t.status || 'Open'}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default DashOverview
