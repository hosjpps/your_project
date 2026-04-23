import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { advantages } from '@/data/advantages'
import { useInView } from '@/hooks/useInView'

export function Advantages() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="advantages" className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Vertical accent line */}
      <div className="absolute left-4 md:left-8 top-[20%] h-[60%] w-0.5 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Наши преимущества
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary">
            Почему выбирают нас
          </h2>
          <p className="mt-3 text-text-secondary text-lg max-w-xl mx-auto">
            Более 15 лет безупречной работы в Выксе
          </p>
        </div>

        <div ref={ref} className="max-w-4xl mx-auto space-y-0">
          {advantages.map((item, index) => {
            const isEven = index % 2 === 1
            const number = String(index + 1).padStart(2, '0')

            return (
              <div key={item.title}>
                {/* Row */}
                <div
                  className={cn(
                    'flex flex-col md:flex-row items-center gap-4 md:gap-8 py-8 md:py-10',
                    'transition-all duration-700 ease-out',
                    isEven ? 'md:flex-row-reverse' : '',
                    isInView
                      ? 'opacity-100 translate-x-0'
                      : isEven
                        ? 'opacity-0 translate-x-12'
                        : 'opacity-0 -translate-x-12'
                  )}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  {/* Large number */}
                  <div className="flex-shrink-0 relative">
                    <span className="text-7xl md:text-8xl font-black text-accent/25 leading-none select-none">
                      {number}
                    </span>
                  </div>

                  {/* Content card */}
                  <div
                    className={cn(
                      'flex items-start gap-5 flex-1 -mt-4 md:-mt-0',
                      isEven ? 'md:-mr-6 md:flex-row-reverse' : 'md:-ml-6',
                      'relative z-10'
                    )}
                  >
                    {/* Icon box */}
                    <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br from-primary-light/20 to-primary/10 flex items-center justify-center shadow-lg shadow-primary/10">
                      <Icon
                        name={item.icon}
                        className="w-6 h-6 md:w-7 md:h-7 text-primary"
                      />
                    </div>

                    {/* Text */}
                    <div className={cn('text-left', isEven && 'md:text-right')}>
                      <h3 className="text-lg md:text-xl font-bold text-text-primary mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider with dot */}
                {index < advantages.length - 1 && (
                  <div className="relative flex items-center justify-center max-w-4xl mx-auto">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                    <div className="absolute w-2 h-2 rounded-full bg-primary/30" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
