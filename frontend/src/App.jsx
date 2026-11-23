import { useEffect, useState } from 'react'
import Appointments from "./components/Appointments";
import AiAssistant from './components/AiAssistant'
import Medications from './components/Medications'

function App() {
  const [healthStatus, setHealthStatus] = useState('בודק חיבור לשרת...')
  const [activeSection, setActiveSection] = useState('add-patient')

  const [fullName, setFullName] = useState('')
  const [idNumber, setIdNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
  
  useEffect(() => {
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
  }, [apiUrl])

  const handleAddPatient = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setFeedback(null)

    try {
      const res = await fetch(`${apiUrl}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: fullName,
          id_number: idNumber,
          phone: phone,
          birth_date: birthDate,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || 'שגיאה בהוספת המטופל')
      }

      setFeedback({ type: 'success', text: `המטופל ${fullName} נוסף בהצלחה למערכת!` })
      setFullName('')
      setIdNumber('')
      setPhone('')
      setBirthDate('')
    } catch (err) {
      setFeedback({ type: 'error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  const sections = [
    { id: 'appointments', title: 'הצג תורים', owner: 'אורי' },
    { id: 'medications', title: 'מלאי תרופות', owner: 'אביתר' },
    { id: 'add-patient', title: 'הוסף מטופל', owner: 'נועם' },
    { id: 'ai-assistant', title: 'שאל את העוזר', owner: 'מתנאל' },
  ]

  const inputStyle = {
    width: '100%',
    padding: '0.65rem',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '1rem',
    boxSizing: 'border-box',
  }

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
          <Appointments />
        )}

        {activeSection === 'medications' && <Medications />}

        {activeSection === 'add-patient' && (
          <div style={{ maxWidth: '480px' }}>
            <h2 style={{ marginTop: 0 }}>הוסף מטופל חדש</h2>
            <form onSubmit={handleAddPatient} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>
                  שם מלא
                </label>
                <input
                  type="text"
                  required
                  placeholder="ישראל ישראלי"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>
                  תעודת זהות
                </label>
                <input
                  type="text"
                  required
                  placeholder="123456789"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>
                  טלפון
                </label>
                <input
                  type="tel"
                  required
                  placeholder="050-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.35rem', fontWeight: '600' }}>
                  תאריך לידה
                </label>
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: submitting ? '#93c5fd' : '#2563eb',
                  color: '#ffffff',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: submitting ? 'not-allowed' : 'pointer',
                  marginTop: '0.5rem',
                }}
              >
                {submitting ? 'שומר מטופל...' : 'הוסף מטופל'}
              </button>
            </form>

            {feedback && (
              <div
                style={{
                  marginTop: '1.25rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  backgroundColor: feedback.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: feedback.type === 'success' ? '#166534' : '#991b1b',
                  border: `1px solid ${feedback.type === 'success' ? '#86efac' : '#fca5a5'}`,
                  fontWeight: '500',
                }}
              >
                {feedback.text}
              </div>
            )}
          </div>
        )}

        {activeSection === 'ai-assistant' && <AiAssistant />}
      </main>
    </div>
  )
}

export default App