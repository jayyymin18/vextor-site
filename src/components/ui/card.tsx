import * as React from 'react'
import { cn } from '@/lib/utils'

export const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-2xl bg-card card-border shadow-[0_18px_46px_rgba(255,205,218,0.24)] dark:shadow-[0_18px_46px_rgba(0,0,0,0.35)] transition duration-200 backdrop-blur-[1px]',
      'hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(255,205,218,0.32)] dark:hover:shadow-[0_22px_54px_rgba(0,0,0,0.45)]',
      className
    )}
    {...props}
  />
)
export const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5', className)} {...props} />
)
export const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-semibold', className)} {...props} />
)
export const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('p-5 pt-0', className)} {...props} />
)
