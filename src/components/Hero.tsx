import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { company } from '@/data/company'
import { useMemo } from 'react'

const stats = [
  { value: '15+', label: 'лет опыта', icon: 'calendar', top: '18%', right: '6%' },
  { value: '3 года', label: 'гарантия', icon: 'shield-check', top: '45%', right: '10%' },
  { value: '0%', label: 'рассрочка', icon: 'wallet', top: '70%', right: '4%' },
]

export function Hero() {
  const primaryPhone = useMemo(
    () => company.phones.find((p) => p.primary) ?? company.phones[0],
    []
  )

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Base deep gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#142368] via-primary to-[#112060]" />

      {/* ── Subtle geometric dot-grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Diagonal lines overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px)',
        }}
      />

      {/* ── Decorative "window frame" outline on the right ── */}
      <div className="hidden lg:block absolute top-1/2 right-[-6%] -translate-y-1/2">
        <div
          className="w-[500px] h-[600px] border-2 border-white/[0.07] rounded-3xl rotate-12"
          aria-hidden="true"
        >
          {/* Cross bars — like a window divided into panes */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.05]" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.05]" />
        </div>
      </div>

      {/* ── Second smaller window frame ── */}
      <div className="hidden lg:block absolute top-[15%] right-[22%]">
        <div
          className="w-[180px] h-[220px] border border-white/[0.06] rounded-2xl -rotate-6"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.04]" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.04]" />
        </div>
      </div>

      {/* ── Ambient light blobs ── */}
      <div className="absolute top-[-10%] right-[15%] w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[120px]" />
      <div className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />

      {/* ── Dark vignette for left-side text readability ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

      {/* ══════════════ CONTENT ══════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
        <div className="max-w-2xl lg:max-w-[55%]">
          {/* ── Badge with pulse animation ── */}
          <Badge
            variant="light"
            className="mb-8 animate-[badge-pulse_3s_ease-in-out_infinite] shadow-[0_0_20px_rgba(255,255,255,0.08)]"
          >
            <Icon name="star" className="w-3.5 h-3.5" />
            Работаем с 2008 года в Выксе
          </Badge>

          {/* ── Headline: huge, asymmetric ── */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-7">
            Окна, двери и&nbsp;ворота
            <br />
            с&nbsp;установкой{' '}
            <span className="relative inline-block text-accent">
              «под&nbsp;ключ»
              {/* Decorative wave underline */}
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 8 C 30 2, 50 12, 80 6 S 130 0, 160 7 S 190 4, 198 6"
                  stroke="#F59E0B"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/75 max-w-xl mb-12 leading-relaxed">
            Собственное производство ПВХ и&nbsp;алюминиевых конструкций.
            Бесплатный замер. Гарантия&nbsp;3&nbsp;года.
          </p>

          {/* ── CTA buttons with glow ── */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16 lg:mb-0">
            <Button
              variant="accent"
              size="lg"
              className="shadow-[0_0_30px_rgba(245,158,11,0.3)] hover:shadow-[0_0_50px_rgba(245,158,11,0.5)] transition-shadow duration-300"
              onClick={() => scrollTo('#contacts')}
            >
              <Icon name="calculator" className="w-5 h-5 mr-2" />
              Рассчитать стоимость
            </Button>
            <a href={`tel:${primaryPhone.raw}`}>
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Icon name="phone" className="w-5 h-5 mr-2" />
                <span className="lg:hidden">Позвонить</span>
                <span className="hidden lg:inline">{primaryPhone.number}</span>
              </Button>
            </a>
          </div>
        </div>

        {/* ── Floating glassmorphism stat pills — Desktop: absolute, Mobile: 2x2 grid ── */}
        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-3 mt-10 lg:hidden">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-3"
            >
              <Icon name={stat.icon} className="w-5 h-5 text-accent shrink-0" />
              <div className="min-w-0">
                <span className="text-lg font-bold text-white">{stat.value}</span>
                <span className="text-xs text-white/60 ml-1.5">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop floating pills */}
        <div className="hidden lg:block">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="absolute flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 hover:bg-white/15 transition-colors duration-300 hover:scale-105 transform"
              style={{ top: stat.top, right: stat.right }}
            >
              <Icon name={stat.icon} className="w-5 h-5 text-accent shrink-0" />
              <div>
                <span className="text-xl font-bold text-white">{stat.value}</span>
                <span className="text-sm text-white/60 ml-2">{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom SVG wave edge ── */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-[60px] sm:h-[80px]"
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 40 C 200 80, 400 0, 600 40 S 1000 80, 1200 30 L 1200 80 L 0 80 Z"
            className="fill-white"
          />
        </svg>
      </div>

      {/* ── Keyframe for badge pulse ── */}
      <style>{`
        @keyframes badge-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.08); }
          50% { box-shadow: 0 0 30px rgba(245,158,11,0.2), 0 0 60px rgba(245,158,11,0.08); }
        }
      `}</style>
    </section>
  )
}
