import { useState, useEffect } from 'react'
import PageLoader from '../../components/common/PageLoader'

const API_BASE = import.meta.env?.VITE_API_URL || '/api'

function Plants() {
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All Status')

  useEffect(() => {
    let isMounted = true
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('adminToken') || localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const res = await fetch(`${API_BASE}/installations?limit=100`, { headers, credentials: 'include' })
        if (res.ok) {
          const json = await res.json()
          if (isMounted && json.data) {
            setPlants(json.data)
          }
        }
      } catch (err) {
        console.warn('Error fetching dynamic plants:', err)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchPlants()
    return () => { isMounted = false }
  }, [])

  const filteredPlants = plants.filter((p) => {
    if (filter === 'All Status') return true
    const status = p.installationStatus || p.status || ''
    return status.toLowerCase() === filter.toLowerCase()
  })

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Solar Plants & Installations</h1>
          <p className="page-subtitle">Manage and monitor all your live solar plant installations.</p>
        </div>
      </div>

      <div className="section-card">
        <div className="section-card-header">
          <h3>All Installations ({filteredPlants.length})</h3>
          <div className="filter-group">
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
        <div className="table-wrap">
          {loading ? (
            <PageLoader />
          ) : (
            <table className="plant-table">
              <thead>
                <tr>
                  <th>Installation / System</th>
                  <th>Location</th>
                  <th>System Type</th>
                  <th>Capacity (kW)</th>
                  <th>Target Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPlants.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#9ca3af' }}>
                      No installations found.
                    </td>
                  </tr>
                ) : (
                  filteredPlants.map((p, idx) => (
                    <tr key={p._id || p.id || idx}>
                      <td className="plant-name">{p.customerName || p.systemType || `System #${p.installationId || idx + 1}`}</td>
                      <td>{p.projectLocation || p.city || '—'}</td>
                      <td>{p.systemType || 'Solar System'}</td>
                      <td>{p.systemCapacityKw || p.capacity ? `${p.systemCapacityKw || p.capacity} kW` : '—'}</td>
                      <td>{p.targetCompletionDate ? new Date(p.targetCompletionDate).toLocaleDateString() : '—'}</td>
                      <td>
                        <span className={`status-badge ${p.installationStatus === 'Completed' ? 'active' : 'pending'}`}>
                          {p.installationStatus || p.status || 'Pending'}
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

export default Plants
