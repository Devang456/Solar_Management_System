import { useState, useEffect } from 'react'
import PageLoader from '../../components/common/PageLoader'

const API_BASE = import.meta.env?.VITE_API_URL || '/api'

function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const [repRes, docRes] = await Promise.allSettled([
          fetch(`${API_BASE}/daily-reports?limit=100`, { headers, credentials: 'include' }).then((res) => res.ok ? res.json() : null),
          fetch(`${API_BASE}/documents?limit=100`, { headers, credentials: 'include' }).then((res) => res.ok ? res.json() : null),
        ])

        if (!isMounted) return

        let list = []
        if (repRes.status === 'fulfilled' && repRes.value?.data) {
          list = list.concat(
            repRes.value.data.map((r) => ({
              id: r._id || r.id,
              name: r.title || r.reportName || `Daily Report - ${r.date || 'Record'}`,
              type: 'PDF',
              date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recent',
              size: '1.2 MB',
              status: 'generated',
            }))
          )
        }
        if (docRes.status === 'fulfilled' && docRes.value?.data) {
          list = list.concat(
            docRes.value.data.map((d) => ({
              id: d._id || d.id,
              name: d.title || d.documentName || 'System Document',
              type: d.fileType || 'PDF',
              date: d.createdAt ? new Date(d.createdAt).toLocaleDateString() : 'Recent',
              size: d.fileSize ? `${(d.fileSize / 1024).toFixed(1)} KB` : '2.0 MB',
              status: 'generated',
            }))
          )
        }
        setReports(list)
      } catch (err) {
        console.warn('Error fetching dynamic reports:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchReports()
    return () => { isMounted = false }
  }, [])

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports & Documents</h1>
          <p className="page-subtitle">View and download generated reports live from database.</p>
        </div>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Total Reports', value: reports.length.toString(), sub: 'In system database' },
          { label: 'Pending Reports', value: '0', sub: 'Awaiting generation' },
          { label: 'Database Records', value: `${reports.length}`, sub: 'Active report entries' },
          { label: 'Last Updated', value: 'Live', sub: 'System database' },
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-info">
              <span className="stat-label">{s.label}</span>
              <span className="stat-value">{s.value}</span>
              <span style={{ fontSize: 12, color: '#9ca3af', marginTop: 2 }}>{s.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <h3>Generated Reports</h3>
        </div>
        <div className="table-wrap">
          {loading ? (
            <PageLoader />
          ) : (
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Report Name</th><th>Format</th><th>Date</th><th>Size</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>
                      No generated reports found in database.
                    </td>
                  </tr>
                ) : (
                  reports.map((r) => (
                    <tr key={r.id}>
                      <td className="plant-name">{r.name}</td>
                      <td><span className="status-badge" style={{ background: '#f3f4f6', color: '#4b5563' }}>{r.type}</span></td>
                      <td>{r.date}</td>
                      <td>{r.size}</td>
                      <td>
                        <span className="status-badge active">
                          {r.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}

export default Reports
