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
      <div className="absolute -right-16 md:-right-24 top-1/2 -translate-y-1/2 text-[36rem] md:text-[52rem] font-black text-white/[0.07] rotate-12 select-none leading-none pointer-events-none">
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

          </div>

          {/* Right — photo framed with glass shape accents */}
          <div className="hidden lg:flex flex-shrink-0 w-[440px] h-[520px] xl:w-[500px] xl:h-[580px] items-center justify-center relative">
            {/* Back accent shape */}
            <div
              className="absolute w-80 h-[24rem] rounded-[2rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl"
              style={{ transform: 'rotate(-8deg) translate(-60px, -40px)' }}
            />
            {/* Mid accent shape */}
            <div
              className="absolute w-72 h-[22rem] rounded-[2rem] bg-white/15 backdrop-blur-sm border border-white/25 shadow-xl"
              style={{ transform: 'rotate(6deg) translate(70px, 50px)' }}
            />
            {/* Man photo — rounded frame */}
            <div className="relative z-10 w-72 h-[24rem] xl:w-80 xl:h-[26rem] rounded-[1.75rem] overflow-hidden border-4 border-white/30 shadow-2xl">
              <img
                src="/мужик.jpeg"
                alt="Специалист «Свой Проект»"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
