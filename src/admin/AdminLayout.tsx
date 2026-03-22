import { useState } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'

const navItems = [
  { to: '/admin', label: 'Дашборд', icon: 'layout-dashboard', end: true },
  { to: '/admin/submissions', label: 'Заявки', icon: 'inbox' },
  { to: '/admin/reviews', label: 'Отзывы', icon: 'message-square' },
  { to: '/admin/portfolio', label: 'Портфолио', icon: 'image' },
]

export function AdminLayout() {
  const { user, loading, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!user) return <Navigate to="/admin/login" replace />

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-200 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-text-primary">Свой Проект</h2>
          <p className="text-xs text-text-secondary">Админ-панель</p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary',
                )
              }
            >
              <Icon name={item.icon} className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors w-full cursor-pointer"
          >
            <Icon name="log-out" className="w-5 h-5" />
            Выйти
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <Icon name="menu" className="w-5 h-5 text-text-primary" />
          </button>
          <h1 className="font-semibold text-text-primary">Админ-панель</h1>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
