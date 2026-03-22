import { useState, type FormEvent } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Icon } from '@/components/ui/Icon'

export function AdminLogin() {
  const { user, loading, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (user) return <Navigate to="/admin" replace />

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const { error: err } = await signIn(email, password)
    if (err) setError('Неверный email или пароль')
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="lock" className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Админ-панель</h1>
          <p className="text-sm text-text-secondary mt-1">Свой Проект</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Логин</label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@svoyproekt.ru"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">Пароль</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 cursor-pointer"
          >
            {submitting ? 'Вход...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  )
}
