import { auth, currentUser } from '@clerk/nextjs/server'
import React from 'react'

const Dashboard = async () => {
   const { isAuthenticated, userId, redirectToSignIn } = await auth()

  if (!isAuthenticated) {
    return redirectToSignIn()
  }

  const user = await currentUser()

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.fullName}!</p>
      <p>User ID: {userId}</p>
    </div>
  )
}

export default Dashboard