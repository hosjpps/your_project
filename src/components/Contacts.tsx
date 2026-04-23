import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { company } from '@/data/company'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'

interface ContactsProps {
  onPrivacyClick?: () => void
}

export function Contacts({ onPrivacyClick }: ContactsProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const { ref, isInView } = useInView(0.1)

  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    const { error: insertError } = await supabase.from('contact_submissions').insert({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      comment: formData.comment || null,
    })
    if (insertError) {
      setError('Не удалось отправить заявку. Позвоните нам по телефону.')
      return
    }
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contacts" className="relative py-20 md:py-28 bg-bg-light overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/[0.03] rounded-full translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/[0.03] rounded-full -translate-x-1/3 translate-y-1/3" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-accent tracking-widest uppercase mb-3">
            Контакты
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary">
            Свяжитесь с нами
          </h2>
          <p className="mt-3 text-text-secondary text-lg max-w-xl mx-auto">
            Ответим на вопросы и поможем подобрать решение
          </p>
        </div>

        {/* Form + Locations grid */}
        <div className={cn(
          'grid lg:grid-cols-2 gap-6 transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}>
          {/* Form — left */}
          <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col">
            {submitted ? (
              <div className="text-center py-8 flex flex-col items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="check" className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Заявка отправлена!
                </h3>
                <p className="text-text-secondary">
                  Мы свяжемся с вами в ближайшее время
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
                <h3 className="text-lg font-bold text-text-primary">
                  Оставить заявку
                </h3>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ваш email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors"
                />
                <textarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Что вас интересует?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none flex-1 min-h-[100px]"
                />
                {error && (
                  <p className="text-sm text-red-500 text-center">{error}</p>
                )}
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Icon name="send" className="w-5 h-5 mr-2" />
                  Оставить заявку
                </Button>
                <p className="text-xs text-text-secondary/60 text-center -mt-2">
                  Нажимая кнопку, вы соглашаетесь с{' '}
                  <button
                    type="button"
                    onClick={onPrivacyClick}
                    className="underline underline-offset-2 hover:text-accent transition-colors cursor-pointer"
                  >
                    политикой конфиденциальности
                  </button>
                </p>
              </form>
            )}
          </div>

          {/* Right column — locations + email + map buttons */}
          <div className="flex flex-col gap-4">
            {/* Location cards */}
            {company.locations.map((loc) => (
              <div
                key={loc.title}
                className="bg-white rounded-2xl p-5 md:p-6 border border-gray-100 shadow-sm"
              >
                {/* Title row */}
                <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-accent/10 shrink-0">
                    <Icon name="map-pin" className="w-4.5 h-4.5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider">Офис</p>
                    <h3 className="text-base font-bold text-text-primary leading-tight">{loc.title}</h3>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 mb-3">
                  <Icon name="map-pin" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <span className="text-sm text-text-primary leading-snug">{loc.address}</span>
                </div>

                <div className="flex items-center gap-2.5 mb-3">
                  <Icon name="phone" className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href={`tel:${loc.phone.raw}`}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {loc.phone.number}
                  </a>
                </div>

                <div className="flex items-start gap-2.5">
                  <Icon name="clock" className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div className="flex flex-col gap-0.5 text-sm">
                    {loc.hours.map((h) => (
                      <div key={h.label} className="flex gap-2">
                        <span className="text-text-secondary w-14 shrink-0">{h.label}</span>
                        <span className="text-text-primary font-medium">{h.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Email */}
            <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/10 shrink-0">
                <Icon name="mail" className="w-5 h-5 text-accent" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-text-secondary">Общая почта</p>
                <a
                  href={`mailto:${company.email}`}
                  className="text-sm md:text-base font-semibold text-text-primary hover:text-accent transition-colors break-all"
                >
                  {company.email}
                </a>
              </div>
            </div>

            {/* Map buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={company.yandexMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white rounded-xl py-4 px-5 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Icon name="map-pin" className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-text-primary">Яндекс.Карты</span>
                <Icon name="arrow-up-right" className="w-3.5 h-3.5 text-text-secondary" />
              </a>
              <a
                href={company.twoGisLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-white rounded-xl py-4 px-5 border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <Icon name="map" className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-text-primary">2ГИС</span>
                <Icon name="arrow-up-right" className="w-3.5 h-3.5 text-text-secondary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
