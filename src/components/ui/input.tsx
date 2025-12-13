import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border card-border bg-white/70 px-3 py-2 outline-none backdrop-blur-sm dark:bg-white/5',
        'placeholder:text-muted-foreground/80 focus:border-transparent focus:ring-2 focus:ring-[rgba(255,194,214,0.6)]',
        className
      )}
      {...props}
    />
  )
)
Input.displayName = 'Input'
