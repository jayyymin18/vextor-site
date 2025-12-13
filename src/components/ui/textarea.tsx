import * as React from 'react'
import { cn } from '@/lib/utils'

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
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
Textarea.displayName = 'Textarea'
