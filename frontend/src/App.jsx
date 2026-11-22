import { useEffect, useState } from 'react'

function App() {
  const [healthStatus, setHealthStatus] = useState('בודק חיבור לשרת...')
  const [activeSection, setActiveSection] = useState('appointments')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error('שגיאת רשת')
        return res.json()
      })
      .then((data) => {
        setHealthStatus(data.status === 'ok' ? 'מחובר (ok)' : JSON.stringify(data))
      })
      .catch((err) => {
        setHealthStatus(`לא מחובר (${err.message})`)
      })
  }, [])

  const sections = [
    { id: 'appointments', title: 'הצג תורים', owner: 'אורי' },
    { id: 'medications', title: 'מלאי תרופות', owner: 'אביתר' },
    { id: 'add-patient', title: 'הוסף מטופל', owner: 'נועם' },
    { id: 'ai-assistant', title: 'שאל את העוזר', owner: 'מתנאל' },
  ]

  return (
    <div
      dir="rtl"
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          paddingBottom: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>CareFlow</h1>
          <p style={{ margin: '0.25rem 0 0', color: '#555' }}>מערכת לניהול רשת מרפאות</p>
        </div>
        <div
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#f3f4f6',
            borderRadius: '8px',
            fontSize: '0.9rem',
          }}
        >
          סטטוס שרת: <strong>{healthStatus}</strong>
        </div>
      </header>

      <nav
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              style={{
                padding: '1.25rem',
                borderRadius: '10px',
                border: isActive ? '2px solid #2563eb' : '1px solid #d1d5db',
                backgroundColor: isActive ? '#eff6ff' : '#ffffff',
                cursor: 'pointer',
                textAlign: 'right',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#111827' }}>
                {section.title}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#6b7280', marginTop: '0.35rem' }}>
                אחראי: {section.owner}
              </div>
            </button>
          )
        })}
      </nav>

      <main
        style={{
          padding: '2rem',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          backgroundColor: '#fafafa',
          minHeight: '220px',
        }}
      >
        {activeSection === 'appointments' && (
          <div>
            <h2>הצג תורים</h2>
            <p>אזור תצוגת תורים (GET /appointments) — יחובר על ידי אורי.</p>
          </div>
        )}

        {activeSection === 'medications' && (
          <div>
            <h2>מלאי תרופות</h2>
            <p>אזור מלאי תרופות (GET /medications) — יחובר על ידי אביתר.</p>
          </div>
        )}

        {activeSection === 'add-patient' && (
          <div>
            <h2>הוסף מטופל</h2>
            <p>טופס הוספת מטופל חדש (POST /patients) — יחובר על ידי נועם.</p>
          </div>
        )}

        {activeSection === 'ai-assistant' && (
          <div>
            <h2>שאל את העוזר</h2>
            <p>ממשק שאלות לעוזר המרפאה (POST /ai-requests) — יחובר על ידי מתנאל.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App