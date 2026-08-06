'use client'

import { cn } from '@/lib/utils'

interface Course {
  name: string;
  price: number;
  description: string;
}

export default function Card(props: Course) {
  return (
    <div
      className={cn(
        'cursor-pointer rounded-lg border border-transparent p-2 transition-colors duration-200 hover:border-gray-100 dark:border-gray-800 dark:hover:bg-gray-800/50'
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div>
            <h3
              className={cn(
                'font-medium',
              )}
            >
              {props.name}
            </h3>

            {props.description && (
              <p
                className={cn(
                  'mt-1 text-sm text-gray-500 dark:text-gray-400'
                )}
              >
                {props.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}