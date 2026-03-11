import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { steps } from '@/data/steps'
import { useInView } from '@/hooks/useInView'

export function HowWeWork() {
  const { ref, isInView } = useInView(0.05)

  return (
    <section id="how-we-work" className="relative bg-white py-20 md:py-28 overflow-hidden">
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #1E3A5F 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 md:mb-20">
          <span className="inline-block text-sm font-semibold text-accent tracking-widest uppercase mb-3">
            Процесс работы
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary">
            Как мы работаем
          </h2>
          <p className="mt-3 text-text-secondary text-lg max-w-xl mx-auto">
            От заявки до установки — 5 простых шагов
          </p>
        </div>

        <div ref={ref}>
          {/* Desktop — clean horizontal timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line through centers */}
              <div className="absolute top-10 left-[10%] right-[10%] h-px bg-gray-200 z-0" />
              {/* Animated progress line */}
              <div
                className={cn(
                  'absolute top-10 left-[10%] h-px bg-gradient-to-r from-primary to-accent z-[1] transition-all duration-1000 ease-out',
                  isInView ? 'right-[10%]' : 'right-[90%]',
                )}
              />

              <div className="grid grid-cols-5 relative z-10">
                {steps.map((step, i) => (
                  <div
                    key={step.number}
                    className={cn(
                      'flex flex-col items-center text-center px-4',
                      'transition-all duration-700 ease-out',
                      isInView
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8',
                    )}
                    style={{ transitionDelay: isInView ? `${i * 150}ms` : '0ms' }}
                  >
                    {/* Number circle */}
                    <div className="relative mb-5">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm transition-all duration-500 hover:border-primary/40 hover:shadow-md">
                        <Icon name={step.icon} className="w-7 h-7 text-primary" />
                      </div>
                      {/* Step number */}
                      <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
                        {step.number}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-[180px]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile — compact cards */}
          <div className="lg:hidden">
            <div className="space-y-3">
              {steps.map((step, i) => (
                <div
                  key={step.number}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100',
                    'transition-all duration-500 ease-out',
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4',
                  )}
                  style={{ transitionDelay: isInView ? `${i * 100}ms` : '0ms' }}
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{step.number}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
