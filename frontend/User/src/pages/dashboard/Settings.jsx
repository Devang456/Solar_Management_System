import { useState } from 'react'

function Settings() {
  const [settings, setSettings] = useState({
    companyName: 'Solar Management Inc.',
    email: 'admin@solarms.com',
    timezone: 'UTC+5:30',
    currency: 'USD',
    notifyAlerts: true,
    notifyReports: true,
    notifyMaintenance: false,
    autoGenerateReports: true,
    twoFactorAuth: false,
  })

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Manage your account and system preferences.</p>
        </div>
        <div className="page-actions">
          <button className="action-btn">Save Changes</button>
        </div>
      </div>

      <div className="settings-grid">
        <div className="section-card">
          <div className="section-card-header">
            <h3>Company Information</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { label: 'Company Name', key: 'companyName', type: 'text' },
              { label: 'Admin Email', key: 'email', type: 'email' },
              { label: 'Timezone', key: 'timezone', type: 'text' },
              { label: 'Currency', key: 'currency', type: 'text' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontSize: 13, color: '#4b5563', fontWeight: 500, display: 'block', marginBottom: 4 }}>{field.label}</label>
                <input
                  type={field.type}
                  value={settings[field.key]}
                  onChange={(e) => setSettings(prev => ({ ...prev, [field.key]: e.target.value }))}
                  className="settings-input"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-card-header">
            <h3>Notifications</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { label: 'System Alerts', key: 'notifyAlerts', desc: 'Get notified about system alerts and warnings' },
              { label: 'Report Generation', key: 'notifyReports', desc: 'Receive notifications when reports are ready' },
              { label: 'Maintenance Reminders', key: 'notifyMaintenance', desc: 'Get reminded about scheduled maintenance' },
            ].map(t => (
              <div key={t.key} className="toggle-row">
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1f2937' }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.desc}</div>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings[t.key]} onChange={() => handleToggle(t.key)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="section-card">
          <div className="section-card-header">
            <h3>Preferences</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              { label: 'Auto-generate Reports', key: 'autoGenerateReports', desc: 'Automatically generate monthly reports' },
              { label: 'Two-Factor Auth', key: 'twoFactorAuth', desc: 'Enable extra security for your account' },
            ].map(t => (
              <div key={t.key} className="toggle-row">
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: '#1f2937' }}>{t.label}</div>
                  <div style={{ fontSize: 12, color: '#9ca3af' }}>{t.desc}</div>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" checked={settings[t.key]} onChange={() => handleToggle(t.key)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings
