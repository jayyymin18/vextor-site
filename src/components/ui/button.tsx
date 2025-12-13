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
          'inline-flex items-center justify-center rounded-xl font-medium transition duration-200 shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[rgba(255,194,214,0.65)] focus-visible:ring-offset-transparent',
          variant === 'outline'
            ? 'border card-border bg-transparent text-foreground hover:bg-[rgba(255,218,232,0.5)] dark:hover:bg-[rgba(59,52,76,0.7)]'
            : 'bg-[linear-gradient(120deg,#ffd9e5,#ffe6c7,#d7f0ff)] text-slate-900 shadow-[0_14px_34px_rgba(255,205,218,0.5)] hover:shadow-[0_18px_44px_rgba(255,205,218,0.6)] dark:text-slate-900',
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
