import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'
import { supabase } from '@/lib/supabase'
import type { PortfolioItem } from '@/lib/types'

const BUCKET = 'portfolio-images'

const staticItems = [
  { title: 'Витражное остекление', image: '/Витражное остекление.jpeg' },
  { title: 'Входная группа', image: '/Входная группа.jpeg' },
  { title: 'Офисная перегородка', image: '/Офисная перегородка.jpeg' },
  { title: 'Фасадное остекление', image: '/Фасадное остекление.jpeg' },
]

function getPublicUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

const VISIBLE_COUNT = 3

export function Portfolio() {
  const { ref, isInView } = useInView(0.1)
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([])
  const [loaded, setLoaded] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    supabase
      .from('portfolio')
      .select('*')
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data) setDbItems(data)
        setLoaded(true)
      })
  }, [])

  const hasDbItems = loaded && dbItems.length > 0

  return (
    <section id="portfolio" className="bg-bg-light py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Наши работы"
          subtitle="Реальные объекты в Выксе и области"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
        >
          {hasDbItems
            ? (showAll ? dbItems : dbItems.slice(0, VISIBLE_COUNT)).map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    'group relative aspect-[4/3] rounded-2xl overflow-hidden',
                    'transition-all duration-700 ease-out',
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={getPublicUrl(item.image_path)}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <p className="text-white text-sm md:text-base font-medium leading-snug">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-white/70 text-xs mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
              ))
            : (showAll ? staticItems : staticItems.slice(0, VISIBLE_COUNT)).map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    'group relative aspect-[4/3] rounded-2xl overflow-hidden',
                    'transition-all duration-700 ease-out',
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/30 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <p className="text-white text-sm md:text-base font-medium leading-snug">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
        </div>

        {/* Show more button */}
        {!showAll && (hasDbItems ? dbItems.length : staticItems.length) > VISIBLE_COUNT && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-white text-sm font-semibold text-text-primary hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
            >
              Показать ещё
              <Icon name="chevron-down" className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
