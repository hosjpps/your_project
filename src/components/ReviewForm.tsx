import { useState, type FormEvent } from 'react'
import { cn } from '@/lib/utils'
import { supabase } from '@/lib/supabase'
import { Icon } from '@/components/ui/Icon'

interface ReviewFormProps {
  onSubmitted?: () => void
}

export function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState(5)
  const [text, setText] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    await supabase.from('reviews').insert({
      name: name.trim(),
      location: location.trim() || null,
      rating,
      text: text.trim(),
    })
    setSubmitted(true)
    setSubmitting(false)
    setTimeout(() => onSubmitted?.(), 2000)
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
        <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
          <Icon name="check" className="w-6 h-6 text-green-500" />
        </div>
        <p className="font-semibold text-text-primary">Спасибо за отзыв!</p>
        <p className="text-sm text-text-secondary mt-1">Он появится после модерации</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 text-left space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя *"
          className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text-primary"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Город (необязательно)"
          className="px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text-primary"
        />
      </div>

      {/* Star rating */}
      <div>
        <p className="text-sm font-medium text-text-secondary mb-2">Оценка</p>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHoverRating(i + 1)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(i + 1)}
              className="cursor-pointer p-0.5"
            >
              <Icon
                name="star"
                className={cn(
                  'w-7 h-7 transition-colors',
                  i < (hoverRating || rating)
                    ? 'text-accent fill-accent'
                    : 'text-gray-200',
                )}
              />
            </button>
          ))}
        </div>
      </div>

      <textarea
        required
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Расскажите о вашем опыте работы с нами..."
        rows={4}
        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-text-primary"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
      >
        {submitting ? 'Отправка...' : 'Отправить отзыв'}
      </button>
    </form>
  )
}
