import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

interface CookieBannerProps {
  onDetailsClick: () => void
}

const COOKIE_KEY = 'svoy-proekt-cookies-accepted'

export function CookieBanner({ onDetailsClick }: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = localStorage.getItem(COOKIE_KEY)
    if (!accepted) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(COOKIE_KEY, 'true')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50 md:bottom-5 md:left-1/2 md:-translate-x-1/2 md:right-auto md:max-w-md',
        'transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
      )}
    >
      <div className="bg-bg-dark text-white rounded-t-2xl md:rounded-2xl p-5 shadow-2xl border border-white/10">
        <div className="flex items-start gap-3 mb-4">
          <Icon name="cookie" className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-white/80 leading-relaxed">
            Мы используем файлы cookies для корректной работы сайта и улучшения вашего опыта.
            Продолжая использование сайта, вы соглашаетесь с{' '}
            <button
              onClick={onDetailsClick}
              className="text-accent underline underline-offset-2 hover:text-accent/80 transition-colors cursor-pointer"
            >
              политикой cookies
            </button>
            .
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={accept}
            className="flex-1 bg-accent hover:bg-accent/90 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Принять
          </button>
          <button
            onClick={onDetailsClick}
            className="px-4 py-2.5 text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
          >
            Подробнее
          </button>
        </div>
      </div>
    </div>
  )
}
