import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// "Ask the assistant" – saves a question to the ai_requests table (POST /ai-requests)
// and shows the latest saved questions (GET /ai-requests).
function AiAssistant() {
  const [question, setQuestion] = useState('')
  const [history, setHistory] = useState([])
  const [status, setStatus] = useState(null) // { type: 'success' | 'error', text }
  const [sending, setSending] = useState(false)

  async function loadHistory() {
    try {
      const res = await fetch(`${API_URL}/ai-requests`)
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || `שגיאה ${res.status}`)
      setHistory(data)
    } catch (err) {
      setStatus({ type: 'error', text: `לא ניתן לטעון שאלות: ${err.message}` })
    }
  }

  useEffect(() => {
    loadHistory()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!question.trim()) return
    setSending(true)
    setStatus(null)
    try {
      const res = await fetch(`${API_URL}/ai-requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || `שגיאה ${res.status}`)
      setStatus({ type: 'success', text: `השאלה נשמרה (מספר ${data.id})` })
      setQuestion('')
      loadHistory()
    } catch (err) {
      setStatus({ type: 'error', text: `השמירה נכשלה: ${err.message}` })
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <h2>שאל את העוזר</h2>
      <p style={{ color: '#555' }}>
        כתבו שאלה לעוזר המרפאה. בשלב זה השאלה נשמרת בבסיס הנתונים, והתשובה מהמודל תתווסף בהמשך.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="לדוגמה: מה שעות הפתיחה של המרפאה?"
          maxLength={1000}
          style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
        />
        <button
          type="submit"
          disabled={sending || !question.trim()}
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2563eb',
            color: '#fff',
            cursor: sending ? 'wait' : 'pointer',
            opacity: sending || !question.trim() ? 0.6 : 1,
          }}
        >
          {sending ? 'שולח...' : 'שלח'}
        </button>
      </form>

      {status && (
        <p style={{ color: status.type === 'success' ? '#15803d' : '#b91c1c' }}>{status.text}</p>
      )}

      <h3 style={{ marginTop: '1.5rem' }}>שאלות אחרונות</h3>
      {history.length === 0 ? (
        <p style={{ color: '#6b7280' }}>עדיין אין שאלות.</p>
      ) : (
        <ul style={{ paddingInlineStart: '1.2rem' }}>
          {history.map((item) => (
            <li key={item.id} style={{ marginBottom: '0.4rem' }}>
              {item.question}{' '}
              <span style={{ color: '#6b7280', fontSize: '0.85rem' }}>
                ({new Date(item.created_at).toLocaleString('he-IL')})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AiAssistant
