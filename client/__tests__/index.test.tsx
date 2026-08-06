import { render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { ClerkProvider, useAuth } from '@clerk/nextjs'
import { MemoryRouterProvider } from 'next-router-mock/MemoryRouterProvider/next-13.5'
// import { userEvent } from '@testing-library/user-event'
import Home from '@/app/(marketing)/page'

jest.mock('@clerk/nextjs', () => {
  const originalModule = jest.requireActual('@clerk/nextjs')
  return {
    ...originalModule,
    useAuth: jest.fn(() => ({ userId: null })),
    SignIn: () => <div data-testid="clerk-sign-in">Sign In Component</div>,
    ClerkProvider: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  }
})

const TestProviders = ({
  isLoggedIn = false,
  children,
}: {
  isLoggedIn?: boolean
  children: ReactNode
}) => {
  ;(useAuth as jest.Mock).mockReturnValue({ userId: isLoggedIn ? 'user-id' : null })

  // Here, we wrap our component in the ClerkProvider and MemoryRouterProvider to provide the necessary context for our tests.
  // MemoryRouterProvider is used to mock the Next.js router,
  // which is necessary for testing components that use the router.
  return (
    <MemoryRouterProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </MemoryRouterProvider>
  )
}

const renderWithProviders = (ui: ReactNode, isLoggedIn?: boolean) => {
  return render(<TestProviders isLoggedIn={isLoggedIn}>{ui}</TestProviders>)
}


describe('Home Page', () => {
  // Grouping tests related to unauthenticated user scenarios
  describe('When a user is unauthenticated', () => {
    const isLoggedIn = false

    it('redirects them to sign in when they try to access the home page', async () => {
      // Render the SubmitReviewPage component with the user not logged in
      renderWithProviders(<Home />, isLoggedIn)

      // Wait for the sign-in element to appear, indicating a redirect to sign-in
      waitFor(
        () => {
          expect(screen.getByTestId('clerk-sign-in')).toBeInTheDocument()
        },
        { timeout: 5000 }, // Timeout after 5 seconds if the element doesn't appear
      )

      // Ensure the review submission prompt is not visible, confirming the redirect
      waitFor(
        () => {
          expect(
            screen.queryByText('Welcome'),
          ).not.toBeInTheDocument()
        },
        { timeout: 5000 }, // Timeout after 5 seconds if the element is still visible
      )
    })
  })
})