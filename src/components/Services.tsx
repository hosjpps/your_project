import { useState } from 'react'
import { cn } from '@/lib/utils'
import { services, type ServiceDetail } from '@/data/services'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'
import { ServiceModal } from '@/components/ServiceModal'

const formatNumber = (n: number) => String(n).padStart(2, '0')

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null)
  const { ref, isInView } = useInView(0.1)

  return (
    <>
      <section id="services" className="py-20 md:py-28 bg-bg-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header with decorative number */}
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -top-16 left-0 text-[160px] md:text-[200px] font-bold text-primary/[0.03] leading-none select-none pointer-events-none"
            >
              01
            </span>
            <SectionTitle
              title="Наши услуги"
              subtitle="Полный спектр решений для вашего дома"
            />
          </div>

          {/* Bento grid */}
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6"
          >
            {services.map((service, i) => {
              const totalServices = services.length
              const remainderCount = totalServices % 3
              const isLastRow = remainderCount > 0 && i >= totalServices - remainderCount
              const isRegular = !isLastRow

              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service)}
                  className={cn(
                    'group relative text-left rounded-2xl overflow-hidden',
                    'bg-white border border-gray-100/80',
                    'transition-all duration-500 cursor-pointer',
                    'hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20',
                    'focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2',
                    isRegular ? 'lg:col-span-2' : 'lg:col-span-3',
                    isInView
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10',
                  )}
                  style={{
                    transitionDelay: isInView ? `${i * 120}ms` : '0ms',
                  }}
                >
                  {/* Gradient top border */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent/60 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card content */}
                  <div className="relative p-6 md:p-8">
                    {/* Card number — top right */}
                    <span
                      aria-hidden="true"
                      className="absolute top-4 right-5 text-4xl font-bold text-primary/10 select-none"
                    >
                      {formatNumber(i + 1)}
                    </span>

                    {/* Icon in gradient box */}
                    <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 transition-transform duration-300 group-hover:scale-110 w-14 h-14 mb-5">
                      <Icon
                        name={service.icon}
                        className="w-7 h-7 text-primary"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-text-primary mb-3 group-hover:text-primary transition-colors duration-300 text-lg md:text-xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-text-secondary leading-relaxed mb-6 text-sm">
                      {service.shortDescription}
                    </p>

                    {/* Animated link */}
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-300">
                      Узнать подробнее
                      <Icon
                        name="arrow-right"
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5"
                      />
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <ServiceModal
        service={selectedService}
        isOpen={selectedService !== null}
        onClose={() => setSelectedService(null)}
      />
    </>
  )
}
