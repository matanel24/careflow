import { useEffect, useState } from 'react'

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function Medications() {
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function loadMedications() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${apiUrl}/medications`)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `שגיאת שרת ${res.status}`)
      }
      setMedications(await res.json())
    } catch (err) {
      setError(err.message || 'לא ניתן להתחבר לשרת')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMedications()
  }, [])

  return (
    <div dir="rtl" style={{ color: '#1f2937' }}>
      <h2 style={{ color: '#1f2937' }}>מלאי תרופות</h2>
      <button onClick={loadMedications} disabled={loading}>
        {loading ? 'טוען...' : 'רענן'}
      </button>

      {error && <p style={{ color: 'red' }}>שגיאה: {error}</p>}

      {!loading && !error && medications.length === 0 && (
        <p>אין תרופות במלאי.</p>
      )}

      {medications.length > 0 && (
        <table style={{ borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr>
              <th style={cell}>שם</th>
              <th style={cell}>מינון</th>
              <th style={cell}>כמות במלאי</th>
              <th style={cell}>מלאי מינימלי</th>
            </tr>
          </thead>
          <tbody>
            {medications.map((med) => {
              const isLow = med.stock_quantity < med.min_stock
              return (
                <tr
                  key={med.id}
                  style={isLow ? { backgroundColor: '#fdd', color: '#a00' } : undefined}
                >
                  <td style={cell}>{med.name}</td>
                  <td style={cell}>{med.dosage}</td>
                  <td style={cell}>{med.stock_quantity}</td>
                  <td style={cell}>{med.min_stock}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

const cell = { border: '1px solid #ccc', padding: '0.4rem 0.8rem' }

export default Medications
