import { company } from '@/data/company'
import { Icon } from '@/components/ui/Icon'

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Наши работы', href: '#portfolio' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#contacts' },
]

interface FooterProps {
  onPrivacyClick?: (tab?: 'privacy' | 'personal-data' | 'cookies') => void
}

export function Footer({ onPrivacyClick }: FooterProps) {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const primaryPhone = company.phones.find((p) => p.primary) ?? company.phones[0]

  return (
    <footer className="bg-bg-dark pt-10 md:pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop: 3 columns */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 pb-10 border-b border-white/10">
          {/* Column 1 — Logo & description */}
          <div>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-block mb-4"
            >
              <img src="/photo_2026-03-25 20.55.05-Photoroom.png" alt="Свой Проект" className="h-44 w-auto -my-14" />
            </a>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Производство и установка пластиковых окон, дверей, балконного
              остекления и секционных ворот в Выксе и районе.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Навигация
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm text-white/50 hover:text-white transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Column 3 — Contact info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Контакты
            </h4>
            <div className="space-y-3">
              <a
                href={`tel:${primaryPhone.raw}`}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
              >
                <Icon name="phone" className="w-4 h-4 text-accent" />
                {primaryPhone.number}
              </a>
              {company.phones
                .filter((p) => !p.primary)
                .map((phone) => (
                  <a
                    key={phone.raw}
                    href={`tel:${phone.raw}`}
                    className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <Icon name="phone" className="w-4 h-4 text-white/30" />
                    {phone.number}
                  </a>
                ))}
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Icon name="mail" className="w-4 h-4 text-accent" />
                {company.email}
              </a>
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Icon name="map-pin" className="w-4 h-4 text-accent" />
                {company.address}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: compact layout */}
        <div className="md:hidden pb-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-5">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <img src="/photo_2026-03-25 20.55.05-Photoroom.png" alt="Свой Проект" className="h-32 w-auto -my-10" />
            </a>
          </div>

          {/* Key contacts — compact */}
          <div className="flex flex-col gap-2.5 mb-5">
            <a
              href={`tel:${primaryPhone.raw}`}
              className="flex items-center gap-2.5 text-sm text-white/70"
            >
              <Icon name="phone" className="w-4 h-4 text-accent" />
              {primaryPhone.number}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="flex items-center gap-2.5 text-sm text-white/50"
            >
              <Icon name="mail" className="w-4 h-4 text-accent" />
              {company.email}
            </a>
            <div className="flex items-center gap-2.5 text-sm text-white/50">
              <Icon name="map-pin" className="w-4 h-4 text-accent" />
              {company.address}
            </div>
          </div>

          {/* Nav links — horizontal wrap */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-xs text-white/40 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>&copy; 2008&ndash;2026 &laquo;Свой Проект&raquo;</p>
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center md:justify-end">
            <button
              onClick={() => onPrivacyClick?.('privacy')}
              className="hover:text-white/70 transition-colors cursor-pointer underline underline-offset-2"
            >
              Конфиденциальность
            </button>
            <span>&middot;</span>
            <button
              onClick={() => onPrivacyClick?.('personal-data')}
              className="hover:text-white/70 transition-colors cursor-pointer underline underline-offset-2"
            >
              Персональные данные
            </button>
            <span>&middot;</span>
            <button
              onClick={() => onPrivacyClick?.('cookies')}
              className="hover:text-white/70 transition-colors cursor-pointer underline underline-offset-2"
            >
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
