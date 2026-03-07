import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-[hsl(var(--accent))/0.55] focus:ring-2 focus:ring-[hsl(var(--accent))/0.25]',
        className
      )}
      {...props}
    />
  )
)

Input.displayName = 'Input'
