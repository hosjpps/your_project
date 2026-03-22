import { useRef, useState, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { reviews as staticReviews } from '@/data/reviews'
import { supabase } from '@/lib/supabase'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { ReviewForm } from '@/components/ReviewForm'
import type { Review } from '@/lib/types'

const avatarColors = [
  'from-primary to-primary-light',
  'from-accent to-orange-500',
  'from-emerald-500 to-teal-500',
  'from-violet-500 to-purple-500',
  'from-rose-500 to-pink-500',
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [dbReviews, setDbReviews] = useState<Review[]>([])
  const [loaded, setLoaded] = useState(false)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data && data.length > 0) setDbReviews(data)
        setLoaded(true)
      })
  }, [])

  // Use DB reviews if available, else static fallback
  const reviews = loaded && dbReviews.length > 0
    ? dbReviews.map((r, i) => ({
        id: i,
        name: r.name,
        location: r.location ?? '',
        text: r.text,
        rating: r.rating,
        admin_reply: r.admin_reply,
      }))
    : staticReviews.map((r) => ({ ...r, admin_reply: null }))

  const totalSlides = reviews.length

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const card = container.children[index] as HTMLElement | undefined
    if (card) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: 'smooth',
      })
    }
  }, [])

  const handleScroll = useCallback(() => {
    const container = scrollRef.current
    if (!container) return
    const scrollLeft = container.scrollLeft
    const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth ?? 1
    const gap = 24
    const idx = Math.round(scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(idx, totalSlides - 1))
  }, [totalSlides])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1))
  const next = () => scrollToIndex(Math.min(totalSlides - 1, activeIndex + 1))

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0'

  return (
    <section id="reviews" className="relative py-20 md:py-28 bg-bg-light overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/[0.03] rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/[0.03] rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="absolute top-16 left-8 md:left-16 text-[180px] md:text-[250px] font-serif text-primary/[0.04] leading-none select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Отзывы наших клиентов"
          subtitle="Нам доверяют жители Выксы"
        />

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="star"
                className="w-5 h-5 text-accent fill-accent"
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-text-primary">{avgRating}</span>
          <span className="text-text-secondary">
            на основе {reviews.length} отзывов
          </span>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={prev}
            disabled={activeIndex === 0}
            className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg shadow-primary/10 border border-gray-100 text-text-secondary hover:text-primary hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Предыдущий отзыв"
          >
            <Icon name="chevron-left" className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            disabled={activeIndex >= totalSlides - 1}
            className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white shadow-lg shadow-primary/10 border border-gray-100 text-text-secondary hover:text-primary hover:shadow-xl disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
            aria-label="Следующий отзыв"
          >
            <Icon name="chevron-right" className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 -mx-4 px-4"
          >
            {reviews.map((review, i) => (
              <article
                key={review.id}
                className="group flex-shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="relative h-full bg-white rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                  <div className="absolute top-0 left-6 right-6 h-[3px] rounded-b-full bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                    <Icon name="quote" className="w-5 h-5 text-primary/40" />
                  </div>

                  <p className="text-text-primary leading-relaxed flex-1 text-base md:text-lg">
                    &laquo;{review.text}&raquo;
                  </p>

                  {/* Admin reply */}
                  {review.admin_reply && (
                    <div className="mt-4 pl-3 border-l-2 border-primary/30 bg-primary/[0.02] rounded-r-lg py-2 pr-3">
                      <p className="text-xs font-semibold text-primary mb-0.5">Ответ компании:</p>
                      <p className="text-sm text-text-secondary">{review.admin_reply}</p>
                    </div>
                  )}

                  <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-11 h-11 rounded-full bg-gradient-to-br flex items-center justify-center text-sm font-bold text-white',
                          avatarColors[i % avatarColors.length]
                        )}
                      >
                        {getInitials(review.name)}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-sm">
                          {review.name}
                        </p>
                        <p className="text-xs text-text-secondary">
                          {review.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Icon
                          key={si}
                          name="star"
                          className={cn(
                            'w-3.5 h-3.5',
                            si < review.rating
                              ? 'text-accent fill-accent'
                              : 'text-gray-200'
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300 cursor-pointer',
                i === activeIndex
                  ? 'bg-primary w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              )}
              aria-label={`Перейти к отзыву ${i + 1}`}
            />
          ))}
        </div>

        {/* Leave review button + form */}
        <div className="text-center mt-12">
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-colors cursor-pointer"
          >
            <Icon name="pencil" className="w-4 h-4" />
            {showForm ? 'Скрыть форму' : 'Оставить отзыв'}
          </button>

          {showForm && (
            <div className="mt-6 max-w-lg mx-auto">
              <ReviewForm onSubmitted={() => setShowForm(false)} />
            </div>
          )}
        </div>

        {/* External links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-text-primary hover:border-primary/30 hover:shadow-md transition-all"
          >
            <Icon name="map-pin" className="w-4 h-4 text-primary" />
            Яндекс.Карты
            <Icon name="arrow-up-right" className="w-3.5 h-3.5 text-text-secondary group-hover:text-primary transition-colors" />
          </a>
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-text-primary hover:border-primary/30 hover:shadow-md transition-all"
          >
            <Icon name="map" className="w-4 h-4 text-primary" />
            2ГИС
            <Icon name="arrow-up-right" className="w-3.5 h-3.5 text-text-secondary group-hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
    </section>
  )
}
