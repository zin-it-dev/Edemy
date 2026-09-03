import { auth } from '@clerk/nextjs/server'
import { cache } from 'react'

export const getSession = cache(async () => {
  const { isAuthenticated, orgId, userId } = await auth()

  if (!isAuthenticated) return null

  return { orgId, userId }
})

export async function requireUser() {
  const session = await getSession()

  if (!session) throw new Error('Unauthorized')

  return session
}