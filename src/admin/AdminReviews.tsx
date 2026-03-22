import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type { Review } from '@/lib/types'

type Filter = 'all' | 'pending' | 'approved' | 'rejected'

const filterLabels: Record<Filter, string> = {
  all: 'Все',
  pending: 'На модерации',
  approved: 'Одобренные',
  rejected: 'Отклонённые',
}

const statusColors: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
}

export function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  const load = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const updateStatus = async (id: string, status: 'approved' | 'rejected') => {
    await supabase.from('reviews').update({ status }).eq('id', id)
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
  }

  const remove = async (id: string) => {
    await supabase.from('reviews').delete().eq('id', id)
    setReviews((prev) => prev.filter((r) => r.id !== id))
  }

  const saveReply = async (id: string) => {
    const reply = replyText.trim() || null
    await supabase.from('reviews').update({ admin_reply: reply }).eq('id', id)
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, admin_reply: reply } : r)))
    setReplyingTo(null)
    setReplyText('')
  }

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter)

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Отзывы</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {(Object.keys(filterLabels) as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer',
              filter === f
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary border border-gray-200 hover:bg-gray-50',
            )}
          >
            {filterLabels[f]}
            {f !== 'all' && (
              <span className="ml-1.5 opacity-70">
                ({reviews.filter((r) => r.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <Icon name="message-square" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Отзывов нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-text-primary">{r.name}</span>
                    {r.location && <span className="text-xs text-text-secondary">{r.location}</span>}
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', statusColors[r.status])}>
                      {filterLabels[r.status as Filter]}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        name="star"
                        className={cn('w-4 h-4', i < r.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200')}
                      />
                    ))}
                  </div>

                  <p className="text-sm text-text-secondary">{r.text}</p>

                  {/* Admin reply */}
                  {r.admin_reply && replyingTo !== r.id && (
                    <div className="mt-3 pl-3 border-l-2 border-primary/30">
                      <p className="text-xs font-medium text-primary mb-0.5">Ответ компании:</p>
                      <p className="text-sm text-text-secondary">{r.admin_reply}</p>
                    </div>
                  )}

                  {/* Reply form */}
                  {replyingTo === r.id && (
                    <div className="mt-3 space-y-2">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Ваш ответ на отзыв..."
                        rows={3}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none text-text-primary"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => saveReply(r.id)}
                          className="px-4 py-1.5 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition-colors cursor-pointer"
                        >
                          Сохранить
                        </button>
                        <button
                          onClick={() => { setReplyingTo(null); setReplyText('') }}
                          className="px-4 py-1.5 text-sm text-text-secondary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        >
                          Отмена
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-text-secondary/50 mt-2">
                    {new Date(r.created_at).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {r.status !== 'approved' && (
                    <button
                      onClick={() => updateStatus(r.id, 'approved')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition-colors cursor-pointer"
                    >
                      <Icon name="check-circle" className="w-3.5 h-3.5" />
                      Опубликовать
                    </button>
                  )}
                  {r.status !== 'rejected' && (
                    <button
                      onClick={() => updateStatus(r.id, 'rejected')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 transition-colors cursor-pointer"
                    >
                      <Icon name="x-circle" className="w-3.5 h-3.5" />
                      Отклонить
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setReplyingTo(r.id)
                      setReplyText(r.admin_reply ?? '')
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    <Icon name="reply" className="w-3.5 h-3.5" />
                    Ответить
                  </button>
                  <button
                    onClick={() => remove(r.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-text-secondary text-xs font-medium hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <Icon name="trash-2" className="w-3.5 h-3.5" />
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
