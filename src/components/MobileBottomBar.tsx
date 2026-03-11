import { useState } from 'react'
import { Phone, MessageSquare, X } from 'lucide-react'
import { company } from '@/data/company'
import { cn } from '@/lib/utils'

export function MobileBottomBar() {
  const [isOpen, setIsOpen] = useState(false)
  const primaryPhone = company.phones.find((p) => p.primary)!

  return (
    <div className="fixed bottom-5 right-4 z-40 md:hidden">
      {/* Expanded menu */}
      <div
        className={cn(
          'absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300',
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none',
        )}
      >
        <a
          href={`tel:${primaryPhone.raw}`}
          className="flex items-center gap-3 bg-primary text-white rounded-full pl-4 pr-5 py-3 shadow-lg shadow-primary/30 text-sm font-semibold whitespace-nowrap active:scale-95 transition-transform"
        >
          <Phone className="w-5 h-5" />
          Позвонить
        </a>
        <a
          href="#contacts"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 bg-accent text-white rounded-full pl-4 pr-5 py-3 shadow-lg shadow-accent/30 text-sm font-semibold whitespace-nowrap active:scale-95 transition-transform"
        >
          <MessageSquare className="w-5 h-5" />
          Заявка
        </a>
      </div>

      {/* FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer',
          isOpen
            ? 'bg-gray-800 rotate-0'
            : 'bg-accent shadow-accent/40',
        )}
        aria-label="Связаться"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  )
}
