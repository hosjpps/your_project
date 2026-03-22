import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'
import { supabase } from '@/lib/supabase'
import type { PortfolioItem } from '@/lib/types'

const BUCKET = 'portfolio-images'

const staticItems = [
  { title: 'Остекление балкона, ул. Островского', gradient: 'from-primary/60 to-primary-dark/80' },
  { title: 'Установка окон ПВХ, мкр. Жуковского', gradient: 'from-blue-400/60 to-blue-600/80' },
  { title: 'Входная дверь с терморазрывом', gradient: 'from-slate-400/60 to-slate-600/80' },
  { title: 'Секционные ворота, пос. Досчатое', gradient: 'from-primary-light/60 to-primary/80' },
  { title: 'Алюминиевые витражи, офис', gradient: 'from-sky-400/60 to-sky-600/80' },
  { title: 'Панорамное остекление, коттедж', gradient: 'from-indigo-400/60 to-indigo-600/80' },
]

function getPublicUrl(path: string) {
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl
}

export function Portfolio() {
  const { ref, isInView } = useInView(0.1)
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([])
  const [loaded, setLoaded] = useState(false)

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
            ? dbItems.map((item, index) => (
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
            : staticItems.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(
                    'group relative aspect-[4/3] rounded-2xl overflow-hidden',
                    'transition-all duration-700 ease-out',
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={cn('absolute inset-0 bg-gradient-to-br', item.gradient)} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/60">
                    <Icon name="camera" className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium">Фото объекта</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
                    <p className="text-white text-sm md:text-base font-medium leading-snug">
                      {item.title}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  )
}
