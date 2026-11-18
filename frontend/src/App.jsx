import { useEffect, useState } from 'react'

function App() {
  const [healthStatus, setHealthStatus] = useState('בודק חיבור לשרת...')

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
    
    fetch(`${apiUrl}/health`)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok')
        return res.json()
      })
      .then((data) => {
        setHealthStatus(JSON.stringify(data))
      })
      .catch((err) => {
        setHealthStatus(`שגיאת חיבור: ${err.message}`)
      })
  }, [])

  return (
    <div dir="rtl" style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>CareFlow</h1>
      <p>סטטוס שרת (Backend /health): <strong>{healthStatus}</strong></p>
    </div>
  )
}

export default App