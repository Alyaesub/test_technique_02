import { useEffect, useState } from 'react'
import { fetchHealth } from './services/api'

type HealthResponse = {
  success: boolean
  message: string
}

function App() {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadHealth = async () => {
      try {
        const result = await fetchHealth()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    loadHealth()
  }, [])

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Technical Test Starter</h1>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <p>Status: {data.success ? 'OK' : 'KO'}</p>
          <p>Message: {data.message}</p>
        </div>
      )}
    </main>
  )
}

export default App
