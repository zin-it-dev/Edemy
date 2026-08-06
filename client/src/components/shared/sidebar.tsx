'use client'

import { cn } from '@/lib/utils'
import { ChevronRightIcon, ChevronLeftIcon, InboxIcon } from 'lucide-react'
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { useState } from 'react'

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div
      className={cn(
        'h-screen border-r border-gray-200 bg-gradient-to-b from-blue-50 via-purple-50/80 to-blue-50 p-4 dark:border-gray-800 dark:from-blue-950/20 dark:via-purple-950/20 dark:to-blue-950/20',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      <nav className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div
            className={cn(
              'transition-all duration-300',
              isCollapsed ? 'w-0 overflow-hidden' : 'w-auto',
            )}
          >
            <UserButton showName />
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex-shrink-0 rounded-lg p-1 transition-colors hover:bg-white/75 dark:hover:bg-gray-800/50"
          >
            {isCollapsed ? (
              <ChevronRightIcon className="h-4 w-4" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" />
            )}
          </button>
        </div>

        <div
          className={cn(
            'transition-all duration-300',
            isCollapsed ? 'w-0 overflow-hidden' : 'w-auto',
          )}
        >
          <Link
            href="/app"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-white/75 dark:text-gray-200 dark:hover:bg-gray-800/50"
          >
            <InboxIcon className="h-4 w-4" />
            <span>Inbox</span>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar