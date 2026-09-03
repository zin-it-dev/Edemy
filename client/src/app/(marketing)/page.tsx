'use client'
import { useAuth } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

interface CurrentUser {
  id: string
  email: string
  [key: string]: any
}

export default function Home() {
  const { sessionId, getToken, isLoaded, isSignedIn } = useAuth()
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return

    const fetchExternalData = async () => {
      try {
        const token = await getToken()
        console.log(token)
        const response = await fetch('http://localhost:8000/users/current-user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`)
        }

        const data = await response.json()
        console.log(data)
        setUser(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchExternalData()
  }, [isLoaded, isSignedIn, getToken])

  if (!isLoaded) return <div>Loading...</div>
  if (!isSignedIn) return <div>Sign in to view this page</div>
  if (loading) return <div>Loading user data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <p>Session: {sessionId}</p>
      <p>Email: {user?.email}</p>
    </div>
  )
}