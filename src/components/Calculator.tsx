import { useState } from 'react'
import { cn } from '@/lib/utils'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'

const productTypes = [
  { id: 'window', label: 'Окно', icon: 'app-window' },
  { id: 'door', label: 'Дверь', icon: 'door-open' },
  { id: 'balcony', label: 'Балкон', icon: 'gallery-horizontal-end' },
  { id: 'gate', label: 'Ворота', icon: 'warehouse' },
] as const

type ProductType = (typeof productTypes)[number]['id']

const constructionTypes: Record<ProductType, string[]> = {
  window: ['Одностворчатое', 'Двустворчатое', 'Трёхстворчатое', 'Балконный блок'],
  door: ['Квартирная', 'Для дома', 'С терморазрывом'],
  balcony: ['Тёплое остекление', 'Холодное остекление', 'Утепление и отделка'],
  gate: ['Секционные', 'Откатные', 'Распашные'],
}

const stepLabels = ['Тип изделия', 'Конструкция', 'Размеры', 'Контакты']

export function Calculator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [productType, setProductType] = useState<ProductType | null>(null)
  const [construction, setConstruction] = useState<string | null>(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const canNext = () => {
    if (currentStep === 0) return productType !== null
    if (currentStep === 1) return construction !== null
    if (currentStep === 2) return width !== '' && height !== ''
    if (currentStep === 3) return name.trim() !== '' && phone.trim() !== ''
    return false
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1)
    } else {
      setSubmitted(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const handleProductSelect = (id: ProductType) => {
    setProductType(id)
    setConstruction(null)
  }

  if (submitted) {
    return (
      <section id="calculator" className="bg-gradient-to-br from-primary to-bg-dark py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="check-circle" className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Заявка отправлена!
            </h3>
            <p className="text-text-secondary mb-6">
              Наш специалист свяжется с вами в течение 15 минут для уточнения деталей и назначения бесплатного замера.
            </p>
            <Button
              variant="accent"
              onClick={() => {
                setSubmitted(false)
                setCurrentStep(0)
                setProductType(null)
                setConstruction(null)
                setWidth('')
                setHeight('')
                setName('')
                setPhone('')
              }}
            >
              Новый расчёт
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="calculator" className="bg-gradient-to-br from-primary to-bg-dark py-16 md:py-24">
      <div className="container mx-auto px-4">
        <SectionTitle
          title="Рассчитайте стоимость за 30 секунд"
          subtitle="Укажите параметры — мы подготовим точный расчёт"
          light
        />

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-2xl">
          {/* Step indicators */}
          <div className="flex items-center justify-center mb-8 md:mb-10">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      'w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300',
                      i <= currentStep
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-text-secondary'
                    )}
                  >
                    {i + 1}
                  </div>
                  <span className="hidden md:block text-xs text-text-secondary mt-1.5">
                    {label}
                  </span>
                </div>
                {i < stepLabels.length - 1 && (
                  <div
                    className={cn(
                      'w-8 md:w-16 h-0.5 mx-1 md:mx-2 transition-colors duration-300',
                      i < currentStep ? 'bg-primary' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Product type */}
          {currentStep === 0 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-5 text-center">
                Выберите тип изделия
              </h3>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {productTypes.map((pt) => (
                  <button
                    key={pt.id}
                    onClick={() => handleProductSelect(pt.id)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-5 md:p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer',
                      productType === pt.id
                        ? 'border-primary bg-primary/5 shadow-md'
                        : 'border-gray-200 hover:border-primary/40 hover:bg-gray-50'
                    )}
                  >
                    <Icon
                      name={pt.icon}
                      className={cn(
                        'w-8 h-8',
                        productType === pt.id ? 'text-primary' : 'text-text-secondary'
                      )}
                    />
                    <span
                      className={cn(
                        'font-semibold',
                        productType === pt.id ? 'text-primary' : 'text-text-primary'
                      )}
                    >
                      {pt.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Construction type */}
          {currentStep === 1 && productType && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-5 text-center">
                Выберите тип конструкции
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {constructionTypes[productType].map((ct) => (
                  <button
                    key={ct}
                    onClick={() => setConstruction(ct)}
                    className={cn(
                      'p-4 rounded-xl border-2 text-left font-medium transition-all duration-200 cursor-pointer',
                      construction === ct
                        ? 'border-primary bg-primary/5 text-primary shadow-md'
                        : 'border-gray-200 text-text-primary hover:border-primary/40 hover:bg-gray-50'
                    )}
                  >
                    {ct}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Dimensions */}
          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-5 text-center">
                Укажите размеры
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Ширина (мм)
                  </label>
                  <input
                    type="number"
                    placeholder="Например, 1400"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Высота (мм)
                  </label>
                  <input
                    type="number"
                    placeholder="Например, 1300"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Contact */}
          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-5 text-center">
                Куда отправить расчёт?
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    placeholder="+7 (___) ___-__-__"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-text-primary"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handleBack}
              className={cn(currentStep === 0 && 'invisible')}
            >
              <Icon name="arrow-left" className="w-4 h-4 mr-2" />
              Назад
            </Button>

            <Button
              variant="accent"
              size="lg"
              onClick={handleNext}
              disabled={!canNext()}
            >
              {currentStep === 3 ? 'Получить расчёт' : 'Далее'}
              {currentStep < 3 && (
                <Icon name="arrow-right" className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-text-secondary mt-6">
            Точную стоимость рассчитает специалист после бесплатного замера
          </p>
        </div>
      </div>
    </section>
  )
}
