import { cn } from '@/lib/utils'
import { type ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'accent' | 'success' | 'light'
  className?: string
}

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium',
        {
          'bg-primary/10 text-primary': variant === 'primary',
          'bg-accent/10 text-accent': variant === 'accent',
          'bg-success/10 text-success': variant === 'success',
          'bg-white/15 text-white backdrop-blur-sm': variant === 'light',
        },
        className
      )}
    >
      {children}
    </span>
  )
}
