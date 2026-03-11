import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { type ServiceDetail } from '@/data/services'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ServiceModalProps {
  service: ServiceDetail | null
  isOpen: boolean
  onClose: () => void
}

// Placeholder gallery images per service (will be replaced with real photos)
const galleryPlaceholders: Record<string, { label: string; icon: string }[]> = {
  windows: [
    { label: 'Окна в квартире', icon: 'home' },
    { label: 'Панорамное остекление', icon: 'maximize' },
    { label: 'Окна в коттедже', icon: 'building' },
    { label: 'Арочные окна', icon: 'circle' },
  ],
  doors: [
    { label: 'Дверь квартирная', icon: 'door-open' },
    { label: 'Дверь с терморазрывом', icon: 'thermometer' },
    { label: 'Дверь в дом', icon: 'home' },
    { label: 'Техническая дверь', icon: 'lock' },
  ],
  balconies: [
    { label: 'Тёплое остекление', icon: 'sun' },
    { label: 'Отделка балкона', icon: 'paintbrush' },
    { label: 'Балкон под ключ', icon: 'key' },
    { label: 'Лоджия', icon: 'panel-top' },
  ],
  gates: [
    { label: 'Секционные ворота', icon: 'warehouse' },
    { label: 'Откатные ворота', icon: 'move-horizontal' },
    { label: 'Распашные ворота', icon: 'door-open' },
    { label: 'Роллетные ворота', icon: 'blinds' },
  ],
  blinds: [
    { label: 'Горизонтальные', icon: 'minus' },
    { label: 'Вертикальные', icon: 'grip-vertical' },
    { label: 'Рулонные шторы', icon: 'scroll' },
    { label: 'День-ночь', icon: 'sun-moon' },
  ],
  aluminum: [
    { label: 'Витражное остекление', icon: 'grid-3x3' },
    { label: 'Перегородки', icon: 'columns-3' },
    { label: 'Входная группа', icon: 'door-open' },
    { label: 'Зимний сад', icon: 'trees' },
  ],
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [activeGallery, setActiveGallery] = useState(0)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setActiveGallery(0)
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setName('')
      setPhone('')
    }, 300)
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setName('')
      setPhone('')
    }, 300)
  }

  if (!service || !isOpen) return null

  const gallery = galleryPlaceholders[service.id] || galleryPlaceholders.windows

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal — near fullscreen */}
      <div
        className="relative bg-white w-full h-full md:w-[95vw] md:h-[92vh] md:max-w-6xl md:rounded-3xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="grid md:grid-cols-2 min-h-full">
            {/* Left — Gallery */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Main gallery image */}
              <div className="flex-1 flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 mb-4 min-h-[180px] md:min-h-[250px]">
                <div className="text-center text-primary/40">
                  <Icon name={gallery[activeGallery].icon} className="w-16 h-16 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">{gallery[activeGallery].label}</p>
                  <p className="text-xs mt-1 opacity-60">Фото скоро появится</p>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={cn(
                      'aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer',
                      i === activeGallery
                        ? 'bg-primary/15 border-2 border-primary/30 shadow-sm'
                        : 'bg-white/60 border border-gray-200 hover:border-primary/20',
                    )}
                  >
                    <Icon
                      name={item.icon}
                      className={cn(
                        'w-5 h-5',
                        i === activeGallery ? 'text-primary' : 'text-gray-400',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right — Content */}
            <div className="p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                  <Icon name={service.icon} className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-6 text-base">
                {service.popup.description}
              </p>

              {/* Types */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon name="layers" className="w-4 h-4 text-accent" />
                  Виды
                </h4>
                <div className="flex flex-wrap gap-2">
                  {service.popup.types.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-primary/5 text-sm text-text-primary border border-primary/10"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advantages */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon name="star" className="w-4 h-4 text-accent" />
                  Преимущества
                </h4>
                <ul className="space-y-2.5">
                  {service.popup.advantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-3">
                      <Icon
                        name="check-circle"
                        className="w-5 h-5 text-success shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-text-secondary">{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              {service.popup.brands && service.popup.brands.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Icon name="award" className="w-4 h-4 text-accent" />
                    Бренды
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {service.popup.brands.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-primary/5 text-sm font-semibold text-primary border border-primary/10"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Spacer to push form down */}
              <div className="flex-1" />

              {/* CTA Form */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-5 md:p-6 border border-primary/10">
                {submitted ? (
                  <div className="text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <Icon name="check" className="w-7 h-7 text-success" />
                    </div>
                    <h4 className="text-lg font-bold text-text-primary mb-2">
                      Спасибо!
                    </h4>
                    <p className="text-sm text-text-secondary">
                      Мы перезвоним в течение 15 минут
                    </p>
                  </div>
                ) : (
                  <>
                    <h4 className="text-base font-bold text-text-primary mb-1">
                      Узнать стоимость
                    </h4>
                    <p className="text-sm text-text-secondary mb-4">
                      Оставьте заявку и мы подберём оптимальное решение
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      />
                      <Button type="submit" variant="accent" className="w-full">
                        Отправить заявку
                      </Button>
                      <p className="text-xs text-text-secondary/60 text-center">
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
