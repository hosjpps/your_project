import { cn } from '@/lib/utils'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'

const partners = [
  { name: 'REHAU', description: 'Профильные системы', border: 'border-violet-300', bg: 'bg-violet-50', nameColor: 'text-violet-700', descColor: 'text-violet-500/80' },
  { name: 'Ivaper', description: 'Оконные профили', border: 'border-blue-300', bg: 'bg-blue-50', nameColor: 'text-blue-700', descColor: 'text-blue-500/80' },
  { name: 'Brusbox', description: 'ПВХ-системы', border: 'border-sky-300', bg: 'bg-sky-50', nameColor: 'text-sky-700', descColor: 'text-sky-500/80' },
  { name: 'MACO', description: 'Фурнитура', border: 'border-red-300', bg: 'bg-red-50', nameColor: 'text-red-700', descColor: 'text-red-500/80' },
  { name: 'Roto', description: 'Фурнитура', border: 'border-amber-300', bg: 'bg-amber-50', nameColor: 'text-amber-700', descColor: 'text-amber-600/80' },
  { name: 'Siegenia Titan', description: 'Фурнитура', border: 'border-emerald-300', bg: 'bg-emerald-50', nameColor: 'text-emerald-700', descColor: 'text-emerald-600/80' },
  { name: 'Alutech', description: 'Ворота и роллеты', border: 'border-teal-300', bg: 'bg-teal-50', nameColor: 'text-teal-700', descColor: 'text-teal-600/80' },
  { name: 'DoorHan', description: 'Ворота и двери', border: 'border-orange-300', bg: 'bg-orange-50', nameColor: 'text-orange-700', descColor: 'text-orange-600/80' },
]

export function Partners() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #1E3A5F 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Работаем с проверенными производителями" />

        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 mb-12"
        >
          {partners.map((partner, i) => (
            <div
              key={partner.name}
              className={cn(
                'group relative flex flex-col items-center justify-center px-6 py-8 md:py-10 rounded-2xl border-2 transition-all duration-500 cursor-default select-none',
                partner.border,
                partner.bg,
                'hover:shadow-lg hover:-translate-y-1',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: isInView ? `${i * 80}ms` : '0ms' }}
            >
              {/* Brand name as "logo" */}
              <span className={cn('text-2xl md:text-3xl font-extrabold tracking-wider', partner.nameColor)}>
                {partner.name}
              </span>
              {/* Description */}
              <span className={cn('mt-2 text-xs font-medium', partner.descColor)}>
                {partner.description}
              </span>
            </div>
          ))}

        </div>

        {/* ГОСТ banner */}
        <div
          className={cn(
            'flex items-center justify-center gap-4 md:gap-6 px-6 py-5 rounded-2xl bg-gradient-to-r from-success/10 via-success/5 to-success/10 border border-success/20 transition-all duration-500',
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6',
          )}
          style={{ transitionDelay: isInView ? `${partners.length * 80}ms` : '0ms' }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-success/15 shrink-0">
            <Icon name="shield-check" className="w-6 h-6 text-success" />
          </div>
          <div>
            <span className="text-sm md:text-base font-bold text-text-primary">
              Вся продукция сертифицирована и соответствует ГОСТ
            </span>
            <p className="text-xs md:text-sm text-text-secondary mt-0.5">
              Гарантия качества на все виды работ и материалов
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
