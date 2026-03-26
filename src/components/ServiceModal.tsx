import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
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

// Gallery images per service — real photos where available, placeholders otherwise
const galleryItems: Record<string, { label: string; icon: string; image?: string }[]> = {
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
    { label: 'Витражное остекление', icon: 'grid-3x3', image: '/Витражное остекление.jpeg' },
    { label: 'Офисная перегородка', icon: 'columns-3', image: '/Офисная перегородка.jpeg' },
    { label: 'Входная группа', icon: 'door-open', image: '/Входная группа.jpeg' },
    { label: 'Фасадное остекление', icon: 'maximize', image: '/Фасадное остекление.jpeg' },
  ],
}

export function ServiceModal({ service, isOpen, onClose }: ServiceModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const { error: insertError } = await supabase.from('contact_submissions').insert({
      name: name.trim(),
      phone: phone.trim(),
      comment: service ? `Заявка из карточки: ${service.title}` : null,
    })
    if (insertError) {
      setError('Ошибка отправки. Позвоните нам напрямую.')
      setSubmitting(false)
      return
    }
    setSubmitted(true)
    setSubmitting(false)
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

  const gallery = galleryItems[service.id] || galleryItems.windows

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={handleClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div
        className="relative bg-white w-full h-full md:w-[90vw] md:h-[88vh] md:max-w-6xl md:rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 shadow-lg hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>

        {/* Desktop: two fixed columns, each scrolls independently */}
        <div className="h-full md:grid md:grid-cols-2">
          {/* Left — Gallery (sticky, centered) */}
          <div className="hidden md:flex md:flex-col bg-gray-50 h-full overflow-y-auto p-6">
            {/* Main image */}
            <div className="flex-1 flex items-center justify-center rounded-2xl overflow-hidden mb-3">
              {gallery[activeGallery].image ? (
                <img
                  src={gallery[activeGallery].image}
                  alt={gallery[activeGallery].label}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center text-primary/40">
                  <Icon name={gallery[activeGallery].icon} className="w-14 h-14 mx-auto mb-3 opacity-50" />
                  <p className="text-sm font-medium">{gallery[activeGallery].label}</p>
                  <p className="text-xs mt-1 opacity-60">Фото скоро появится</p>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 shrink-0">
              {gallery.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGallery(i)}
                  className={cn(
                    'aspect-[4/3] rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer overflow-hidden',
                    i === activeGallery
                      ? 'ring-2 ring-primary/40 shadow-sm'
                      : 'border border-gray-200 hover:border-primary/20',
                    !item.image && (i === activeGallery ? 'bg-primary/10' : 'bg-white'),
                  )}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                  ) : (
                    <Icon
                      name={item.icon}
                      className={cn(
                        'w-5 h-5',
                        i === activeGallery ? 'text-primary' : 'text-gray-400',
                      )}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right — Content (scrollable) */}
          <div className="h-full overflow-y-auto">
            {/* Mobile gallery */}
            <div className="md:hidden bg-gray-50 p-4">
              <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3">
                {gallery[activeGallery].image ? (
                  <img
                    src={gallery[activeGallery].image}
                    alt={gallery[activeGallery].label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/40">
                    <div className="text-center">
                      <Icon name={gallery[activeGallery].icon} className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm font-medium">{gallery[activeGallery].label}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {gallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveGallery(i)}
                    className={cn(
                      'aspect-square rounded-lg flex items-center justify-center cursor-pointer overflow-hidden',
                      i === activeGallery
                        ? 'ring-2 ring-primary/40'
                        : 'border border-gray-200',
                      !item.image && (i === activeGallery ? 'bg-primary/10' : 'bg-white'),
                    )}
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
                    ) : (
                      <Icon name={item.icon} className={cn('w-5 h-5', i === activeGallery ? 'text-primary' : 'text-gray-400')} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Text content */}
            <div className="p-5 md:p-6">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                  <Icon name={service.icon} className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary leading-tight">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-4 text-sm">
                {service.popup.description}
              </p>

              {/* Types */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Icon name="layers" className="w-3.5 h-3.5 text-accent" />
                  Виды
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {service.popup.types.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/5 text-xs text-text-primary border border-primary/10"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advantages — two columns with dots */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Icon name="star" className="w-3.5 h-3.5 text-accent" />
                  Преимущества
                </h4>
                <ul className={cn(
                  service.popup.advantages.length > 4
                    ? 'grid grid-cols-2 gap-x-4 gap-y-1.5'
                    : 'space-y-1.5',
                )}>
                  {service.popup.advantages.map((adv) => (
                    <li key={adv} className="flex items-start gap-2 text-sm text-text-secondary leading-relaxed">
                      <span className="text-accent shrink-0">•</span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Brands */}
              {service.popup.brands && service.popup.brands.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Icon name="award" className="w-3.5 h-3.5 text-accent" />
                    Бренды
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {service.popup.brands.map((brand) => (
                      <span
                        key={brand}
                        className="inline-flex items-center px-2.5 py-1 rounded-md bg-primary/5 text-xs font-semibold text-primary border border-primary/10"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Form */}
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10 mt-6">
                {submitted ? (
                  <div className="text-center py-3">
                    <div className="w-11 h-11 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
                      <Icon name="check" className="w-5 h-5 text-success" />
                    </div>
                    <h4 className="text-sm font-bold text-text-primary mb-1">Спасибо!</h4>
                    <p className="text-xs text-text-secondary">Мы свяжемся с вами в ближайшее время</p>
                  </div>
                ) : (
                  <>
                    <h4 className="text-sm font-bold text-text-primary mb-0.5">Узнать стоимость</h4>
                    <p className="text-xs text-text-secondary mb-3">Оставьте заявку и мы подберём оптимальное решение</p>
                    <form onSubmit={handleSubmit} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                      />
                      {error && (
                        <p className="text-xs text-red-500 text-center">{error}</p>
                      )}
                      <Button type="submit" variant="accent" className="w-full" disabled={submitting}>
                        {submitting ? 'Отправка...' : 'Отправить заявку'}
                      </Button>
                      <p className="text-[11px] text-text-secondary/60 text-center">
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
