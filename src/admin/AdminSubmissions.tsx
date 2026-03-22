import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import type { ContactSubmission } from '@/lib/types'

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })
    setSubmissions(data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const markRead = async (id: string) => {
    await supabase.from('contact_submissions').update({ is_read: true }).eq('id', id)
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, is_read: true } : s)))
  }

  const remove = async (id: string) => {
    await supabase.from('contact_submissions').delete().eq('id', id)
    setSubmissions((prev) => prev.filter((s) => s.id !== id))
  }

  if (loading) {
    return <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" /></div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Заявки</h1>

      {submissions.length === 0 ? (
        <div className="text-center py-16 text-text-secondary">
          <Icon name="inbox" className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className={cn(
                'bg-white rounded-xl border p-4 md:p-5 transition-all',
                s.is_read ? 'border-gray-200' : 'border-primary/30 bg-primary/[0.02]',
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    {!s.is_read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                    )}
                    <span className="font-semibold text-text-primary">{s.name}</span>
                    <span className="text-xs text-text-secondary">
                      {new Date(s.created_at).toLocaleDateString('ru-RU', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    <a href={`tel:${s.phone}`} className="text-primary hover:underline">{s.phone}</a>
                    {s.email && <span className="text-text-secondary">{s.email}</span>}
                  </div>
                  {s.comment && (
                    <p className="text-sm text-text-secondary mt-2">{s.comment}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {!s.is_read && (
                    <button
                      onClick={() => markRead(s.id)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-text-secondary hover:text-primary transition-colors cursor-pointer"
                      title="Прочитано"
                    >
                      <Icon name="check" className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => remove(s.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-text-secondary hover:text-red-500 transition-colors cursor-pointer"
                    title="Удалить"
                  >
                    <Icon name="trash-2" className="w-4 h-4" />
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
