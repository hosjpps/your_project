import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { company } from '@/data/company'
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
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

        {/* Contact info cards — horizontal strip */}
        <div className={cn(
          'grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10 transition-all duration-700',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Icon name="map-pin" className="w-5 h-5 text-accent mb-2" />
            <p className="text-xs text-text-secondary mb-0.5">Адрес</p>
            <p className="text-sm font-semibold text-text-primary">{company.address}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Icon name="phone" className="w-5 h-5 text-accent mb-2" />
            <p className="text-xs text-text-secondary mb-0.5">Телефон</p>
            <a
              href={`tel:${company.phones[0].raw}`}
              className="text-sm font-semibold text-accent hover:underline"
            >
              {company.phones[0].number}
            </a>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Icon name="mail" className="w-5 h-5 text-accent mb-2" />
            <p className="text-xs text-text-secondary mb-0.5">Email</p>
            <a
              href={`mailto:${company.email}`}
              className="text-sm font-semibold text-text-primary hover:text-accent transition-colors"
            >
              {company.email}
            </a>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
            <Icon name="clock" className="w-5 h-5 text-accent mb-2" />
            <p className="text-xs text-text-secondary mb-0.5">Режим работы</p>
            <p className="text-sm font-semibold text-text-primary">
              Пн–Пт: {company.workHours.weekdays}
            </p>
          </div>
        </div>

        {/* Form + Map row */}
        <div className={cn(
          'grid lg:grid-cols-5 gap-6 transition-all duration-700 delay-200',
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6',
        )}>
          {/* Form — 2 cols */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm">
            {submitted ? (
              <div className="text-center py-8">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-bold text-text-primary mb-1">
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
                  rows={3}
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder="Что вас интересует?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-colors resize-none"
                />
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Icon name="send" className="w-5 h-5 mr-2" />
                  Оставить заявку
                </Button>
                <p className="text-xs text-text-secondary/60 text-center">
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

          {/* Map — 3 cols */}
          <div className="lg:col-span-3">
            {/* Desktop: embedded map */}
            <div className="hidden lg:block h-full min-h-[360px]">
              <iframe
                src={company.yandexMapEmbed}
                title="Карта — Свой Проект"
                className="w-full h-full rounded-2xl border border-gray-200"
                allowFullScreen
                loading="lazy"
              />
            </div>
            {/* Mobile: two map buttons side by side */}
            <div className="lg:hidden grid grid-cols-2 gap-3">
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
