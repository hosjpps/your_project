import { useState, useEffect, useCallback, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { company } from '@/data/company'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const navLinks = [
  { label: 'Услуги', href: '#services' },
  { label: 'Преимущества', href: '#advantages' },
  { label: 'Наши работы', href: '#portfolio' },
  { label: 'О компании', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
]

const sectionIds = navLinks.map((l) => l.href.slice(1))

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeId = useScrollSpy(sectionIds, 120)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const scrollTo = useCallback(
    (href: string) => {
      setMobileOpen(false)
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    []
  )

  const primaryPhone = useMemo(
    () => company.phones.find((p) => p.primary) ?? company.phones[0],
    []
  )

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex flex-col leading-tight"
            >
              <span
                className={cn(
                  'text-lg md:text-xl font-bold tracking-wide transition-colors',
                  scrolled ? 'text-primary' : 'text-white'
                )}
              >
                СВОЙ ПРОЕКТ
              </span>
              <span
                className={cn(
                  'text-[10px] md:text-xs transition-colors',
                  scrolled ? 'text-text-secondary' : 'text-white/70'
                )}
              >
                Оконная компания с 2008 г.
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer',
                    activeId === link.href.slice(1)
                      ? scrolled
                        ? 'text-accent bg-accent/5'
                        : 'text-white bg-white/15'
                      : scrolled
                        ? 'text-text-primary hover:text-accent hover:bg-accent/5'
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                  )}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop right */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={`tel:${primaryPhone.raw}`}
                className={cn(
                  'text-sm font-semibold transition-colors',
                  scrolled ? 'text-text-primary hover:text-accent' : 'text-white hover:text-white/80'
                )}
              >
                {primaryPhone.number}
              </a>
              <Button
                size="sm"
                variant="accent"
                onClick={() => scrollTo('#contacts')}
              >
                Бесплатный замер
              </Button>
            </div>

            {/* Mobile right */}
            <div className="flex lg:hidden items-center gap-2">
              <a
                href={`tel:${primaryPhone.raw}`}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'
                )}
                aria-label="Позвонить"
              >
                <Icon name="phone" className="w-5 h-5" />
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={cn(
                  'p-2 rounded-lg transition-colors cursor-pointer',
                  scrolled ? 'text-primary hover:bg-primary/5' : 'text-white hover:bg-white/10'
                )}
                aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                <Icon name={mobileOpen ? 'x' : 'menu'} className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-all duration-300',
          mobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        )}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300',
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <span className="text-lg font-bold text-primary">СВОЙ ПРОЕКТ</span>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Закрыть меню"
            >
              <Icon name="x" className="w-6 h-6 text-text-secondary" />
            </button>
          </div>

          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'text-left px-4 py-3 rounded-xl text-base font-medium transition-colors cursor-pointer',
                  activeId === link.href.slice(1)
                    ? 'text-accent bg-accent/5'
                    : 'text-text-primary hover:bg-gray-50'
                )}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="px-4 py-6 mt-auto border-t border-gray-100">
            <div className="flex flex-col gap-2 mb-6">
              {company.phones.map((phone) => (
                <a
                  key={phone.raw}
                  href={`tel:${phone.raw}`}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Icon name="phone" className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-text-primary">
                    {phone.number}
                  </span>
                </a>
              ))}
            </div>
            <Button
              variant="accent"
              className="w-full"
              onClick={() => scrollTo('#contacts')}
            >
              Бесплатный замер
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
