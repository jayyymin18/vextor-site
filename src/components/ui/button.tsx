import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline'
  size?: 'sm' | 'md' | 'lg' | 'icon'
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
  icon: 'h-10 w-10 p-0',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-medium transition-colors',
          variant === 'outline'
            ? 'border card-border bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800'
            : 'bg-neutral-900 text-white hover:opacity-90 dark:bg-white dark:text-neutral-900',
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
