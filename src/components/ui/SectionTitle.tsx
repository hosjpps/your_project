import { cn } from '@/lib/utils'

interface SectionTitleProps {
  title: string
  subtitle?: string
  light?: boolean
  className?: string
}

export function SectionTitle({ title, subtitle, light, className }: SectionTitleProps) {
  return (
    <div className={cn('text-center mb-12 md:mb-16', className)}>
      <h2
        className={cn(
          'text-3xl md:text-4xl font-bold mb-4',
          light ? 'text-white' : 'text-text-primary'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'text-lg md:text-xl max-w-2xl mx-auto',
            light ? 'text-white/70' : 'text-text-secondary'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
