import { cn } from '@/lib/utils'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'outline' | 'ghost' | 'white'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'accent', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          {
            'bg-accent text-white hover:bg-accent-hover focus:ring-accent shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30':
              variant === 'accent',
            'bg-primary text-white hover:bg-primary-light focus:ring-primary':
              variant === 'primary',
            'border-2 border-white text-white hover:bg-white/10 focus:ring-white':
              variant === 'outline',
            'text-primary hover:bg-primary/5 focus:ring-primary':
              variant === 'ghost',
            'bg-white text-primary hover:bg-gray-50 focus:ring-white shadow-lg':
              variant === 'white',
          },
          {
            'text-sm px-4 py-2': size === 'sm',
            'text-base px-6 py-3': size === 'md',
            'text-lg px-8 py-4': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
