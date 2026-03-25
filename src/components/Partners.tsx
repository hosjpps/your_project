import { cn } from '@/lib/utils'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'

const partners = [
  { name: 'REHAU', description: 'Профильные системы', accent: 'group-hover:border-violet-400 group-hover:bg-violet-50' },
  { name: 'Ivaper', description: 'Оконные профили', accent: 'group-hover:border-blue-400 group-hover:bg-blue-50' },
  { name: 'Brusbox', description: 'ПВХ-системы', accent: 'group-hover:border-sky-400 group-hover:bg-sky-50' },
  { name: 'MACO', description: 'Фурнитура', accent: 'group-hover:border-red-400 group-hover:bg-red-50' },
  { name: 'Roto', description: 'Фурнитура', accent: 'group-hover:border-amber-400 group-hover:bg-amber-50' },
  { name: 'Siegenia Titan', description: 'Фурнитура', accent: 'group-hover:border-emerald-400 group-hover:bg-emerald-50' },
  { name: 'Alutech', description: 'Ворота и роллеты', accent: 'group-hover:border-teal-400 group-hover:bg-teal-50' },
  { name: 'DoorHan', description: 'Ворота и двери', accent: 'group-hover:border-orange-400 group-hover:bg-orange-50' },
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
                'group relative flex flex-col items-center justify-center px-6 py-8 md:py-10 rounded-2xl border-2 border-gray-100 bg-gray-50/50 transition-all duration-500 cursor-default select-none',
                partner.accent,
                'hover:shadow-lg hover:-translate-y-1',
                isInView
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6',
              )}
              style={{ transitionDelay: isInView ? `${i * 80}ms` : '0ms' }}
            >
              {/* Brand name as "logo" */}
              <span className="text-2xl md:text-3xl font-extrabold tracking-wider text-gray-300 group-hover:text-gray-700 transition-colors duration-300">
                {partner.name}
              </span>
              {/* Description */}
              <span className="mt-2 text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                {partner.description}
              </span>
            </div>
          ))}

          {/* ГОСТ badge card */}
          <div
            className={cn(
              'flex flex-col items-center justify-center px-6 py-8 md:py-10 rounded-2xl border-2 border-dashed border-success/30 bg-success/5 transition-all duration-500',
              isInView
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6',
            )}
            style={{ transitionDelay: isInView ? `${partners.length * 80}ms` : '0ms' }}
          >
            <Icon name="shield-check" className="w-8 h-8 text-success mb-2" />
            <span className="text-sm font-semibold text-success text-center">
              Соответствует ГОСТ
            </span>
            <span className="text-xs text-success/60 mt-1 text-center">
              Сертифицировано
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
