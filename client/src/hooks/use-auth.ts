"use client"

import { useContext } from 'react'
import { AuthContext } from "@/providers/auth-provider"

// Custom hook to access the auth context from any component
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}