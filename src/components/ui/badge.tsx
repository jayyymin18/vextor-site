import * as React from 'react'
import { cn } from '@/lib/utils'

export const Badge = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'inline-flex items-center rounded-full border border-transparent px-3 py-1 text-xs font-medium text-[#2d2235]',
      'bg-[linear-gradient(120deg,#fbe5ff,#ffe6cf,#dff3ff)] shadow-[0_8px_20px_rgba(255,210,225,0.35)] backdrop-blur-[1px]',
      className
    )}
    {...props}
  />
)
