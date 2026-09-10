"use client"

import { createContext, useState, useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'
import axios from '@/lib/axios'
import { User } from '@/types/types'

interface AuthContextType {
  user: User | null
  // signIn: (email: string, password: string) => Promise<void>
  // signUp: (email: string, password: string, name?: string) => Promise<void>
  // signOut: () => Promise<void>
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { getToken } = useAuth();

  useEffect(() => {
    // Used to check the session status with the server
  const checkAuth = async () => {
    try {
      const token = await getToken()
      if (token) {
        axios.defaults.headers.Authorization = `Bearer ${token}`
        const { data: user } = await axios.get('/users/current-user/')
        if (user) setUser(user)
      }
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to check auth status:', error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

    checkAuth()
  }, [getToken])

  // // Used to create a session and store the user data in the context
  // const signIn = async (email: string, password: string) => {
  //   const response = await fetch('/api/auth/signin', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ email, password }),
  //   })

  //   if (!response.ok) {
  //     const error = await response.json()
  //     throw new Error(error.error || 'Failed to sign in')
  //   }

  //   const data = await response.json()
  //   setUser(data)
  // }

  // // Used to sign up a new user, create a session, and store the user data in the context
  // const signUp = async (email: string, password: string, name?: string) => {
  //   const response = await fetch('/api/auth/signup', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({ email, password, name }),
  //   })

  //   if (!response.ok) {
  //     const error = await response.json()
  //     throw new Error(error.error || 'Failed to sign up')
  //   }

  //   const data = await response.json()
  //   setUser(data)
  // }

  // // Used to sign out a user and clear the user data from the context
  // const signOut = async () => {
  //   await fetch('/api/auth/signout', {
  //     method: 'POST',
  //     credentials: 'include',
  //   })
  //   setUser(null)
  // }

  return (
    // <AuthContext.Provider value={{ user, signIn, signUp, signOut, isLoading }}>
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}