import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Icon } from '@/components/ui/Icon'

export function AdminDashboard() {
  const [counts, setCounts] = useState({
    pendingReviews: 0,
    unreadSubmissions: 0,
    portfolioItems: 0,
    approvedReviews: 0,
  })

  useEffect(() => {
    async function load() {
      const [reviews, submissions, portfolio, approved] = await Promise.all([
        supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('portfolio').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('status', 'approved'),
      ])
      setCounts({
        pendingReviews: reviews.count ?? 0,
        unreadSubmissions: submissions.count ?? 0,
        portfolioItems: portfolio.count ?? 0,
        approvedReviews: approved.count ?? 0,
      })
    }
    load()
  }, [])

  const cards = [
    {
      label: 'Новых заявок',
      value: counts.unreadSubmissions,
      icon: 'inbox',
      to: '/admin/submissions',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'На модерации',
      value: counts.pendingReviews,
      icon: 'message-square',
      to: '/admin/reviews',
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Отзывов',
      value: counts.approvedReviews,
      icon: 'star',
      to: '/admin/reviews',
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Фото в портфолио',
      value: counts.portfolioItems,
      icon: 'image',
      to: '/admin/portfolio',
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Дашборд</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            to={card.to}
            className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <Icon name={card.icon} className="w-5 h-5" />
            </div>
            <p className="text-3xl font-bold text-text-primary">{card.value}</p>
            <p className="text-sm text-text-secondary mt-1">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
