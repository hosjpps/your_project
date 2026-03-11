import { cn } from '@/lib/utils'
import { Icon } from '@/components/ui/Icon'
import { useInView } from '@/hooks/useInView'

const stats = [
  { value: '15+', label: 'лет на рынке', icon: 'calendar-check' },
  { value: '3000+', label: 'выполненных заказов', icon: 'clipboard-check' },
  { value: '100%', label: 'контроль качества', icon: 'award' },
]

const milestones = [
  { year: '2008', text: 'Основание компании в Выксе' },
  { year: '2012', text: 'Запуск собственного производства' },
  { year: '2018', text: 'Расширение линейки: ворота, двери, алюминий' },
  { year: '2024', text: '3000+ выполненных заказов' },
]

export function About() {
  const { ref, isInView } = useInView(0.1)

  return (
    <section id="about" className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <div
            className={cn(
              'transition-all duration-700',
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            )}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/60 mb-6">
              <Icon name="building-2" className="w-4 h-4 text-accent" />
              О компании
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Создаём комфорт
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">
                с 2008 года
              </span>
            </h2>

            <div className="space-y-5 text-white/60 text-base md:text-lg leading-relaxed mb-10">
              <p>
                Мы помогаем жителям Выксы и района делать дома теплее, тише и
                безопаснее. За это время выполнили более 3000 заказов — от установки
                пластиковых окон до остекления коттеджей.
              </p>
              <p>
                Собственное производство позволяет контролировать качество на каждом
                этапе и предлагать лучшие цены без посредников.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10 transition-all duration-300 group-hover:border-accent/30" />
                  <div className="relative p-4 text-center">
                    <Icon
                      name={stat.icon}
                      className="w-5 h-5 text-accent mx-auto mb-2"
                    />
                    <p className="text-2xl md:text-3xl font-bold text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — timeline + visual */}
          <div
            className={cn(
              'transition-all duration-700 delay-200',
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
          >
            {/* Image placeholder with window frame decoration */}
            <div className="relative mb-10">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/60 via-primary/40 to-primary-dark/60 overflow-hidden flex items-center justify-center border border-white/10">
                {/* Window frame decoration */}
                <div className="absolute inset-6 border-2 border-white/10 rounded-xl" />
                <div className="absolute inset-6 grid grid-cols-2 grid-rows-2 gap-0">
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-white/10" />
                  <div />
                </div>
                <div className="relative text-center text-white/50 z-10">
                  <Icon name="image" className="w-12 h-12 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">Фото производства</p>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -bottom-5 -left-3 md:-left-5 bg-gradient-to-br from-accent to-orange-500 text-white rounded-2xl px-6 py-3 shadow-xl shadow-accent/20">
                <p className="text-2xl font-bold">с 2008</p>
                <p className="text-xs text-white/80">года на рынке</p>
              </div>
            </div>

            {/* Mini timeline */}
            <div className="space-y-0">
              {milestones.map((milestone, i) => (
                <div key={milestone.year} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-3 h-3 rounded-full border-2 transition-all duration-300',
                        i === milestones.length - 1
                          ? 'bg-accent border-accent shadow-lg shadow-accent/30'
                          : 'bg-transparent border-white/30'
                      )}
                    />
                    {i < milestones.length - 1 && (
                      <div className="w-px h-8 bg-white/10" />
                    )}
                  </div>
                  <div className="pb-2 -mt-1">
                    <span className="text-xs font-semibold text-accent">
                      {milestone.year}
                    </span>
                    <p className="text-sm text-white/50">{milestone.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
