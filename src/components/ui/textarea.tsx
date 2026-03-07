import * as React from 'react'
import { cn } from '@/lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition placeholder:text-muted-foreground focus:border-[hsl(var(--accent))/0.55] focus:ring-2 focus:ring-[hsl(var(--accent))/0.25]',
        className
      )}
      {...props}
    />
  )
)

Textarea.displayName = 'Textarea'
