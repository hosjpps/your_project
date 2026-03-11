import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/utils'

export function Promo() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-orange-500 to-amber-600 py-16 md:py-24">
      {/* Pattern overlay — large circles */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Decorative "%" symbol */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-black text-white/5 rotate-12 select-none leading-none pointer-events-none">
        %
      </div>

      {/* Soft glow blurs */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — text content */}
          <div className="flex-1 text-center lg:text-left">
            <Badge variant="light" className="mb-6">
              <Icon name="sparkles" className="w-4 h-4" />
              Специальное предложение
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              Бесплатный замер
              <br />
              <span className="text-white/90">+ консультация специалиста</span>
            </h2>

            <p className="text-lg md:text-xl text-white/85 max-w-lg mb-10 leading-relaxed">
              Оставьте заявку сейчас — наш специалист приедет, точно замерит и
              поможет выбрать оптимальное решение. Никаких обязательств!
            </p>

            {/* CTA button with hover arrow */}
            <Button
              variant="white"
              size="lg"
              onClick={() => {
                document
                  .querySelector('#contacts')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }}
              className={cn(
                'group text-accent font-bold',
                'shadow-xl hover:shadow-2xl hover:scale-105',
                'transition-all duration-300'
              )}
            >
              <span className="inline-flex items-center gap-2">
                <Icon
                  name="arrow-right"
                  className="w-5 h-5 -ml-1 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
                <span>Записаться на замер</span>
              </span>
            </Button>

            {/* Trust counter */}
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-2.5 text-white/80 text-sm">
              {/* Pulsing green dot */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              Уже 127 человек записались в этом месяце
            </div>

            <p className="mt-4 text-xs text-white/50">
              Предложение действует для жителей г. Выкса и района
            </p>
          </div>

          {/* Right — abstract glass shapes */}
          <div className="hidden lg:flex flex-shrink-0 w-72 h-72 xl:w-80 xl:h-80 items-center justify-center relative">
            {/* Shape 1 — large */}
            <div
              className="absolute w-48 h-56 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
              style={{ transform: 'rotate(-6deg) translateX(10px)' }}
            />
            {/* Shape 2 — medium */}
            <div
              className="absolute w-40 h-48 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 shadow-xl"
              style={{ transform: 'rotate(8deg) translate(-20px, 15px)' }}
            />
            {/* Shape 3 — small accent */}
            <div
              className="absolute w-28 h-32 rounded-2xl bg-white/20 backdrop-blur border border-white/30 shadow-lg"
              style={{ transform: 'rotate(-12deg) translate(30px, -25px)' }}
            />
            {/* Inner icon */}
            <div className="relative z-10 w-16 h-16 rounded-xl bg-white/25 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <Icon name="calendar-check" className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
