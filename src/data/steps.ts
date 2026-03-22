export interface Step {
  number: number
  icon: string
  title: string
  description: string
}

export const steps: Step[] = [
  {
    number: 1,
    icon: 'phone',
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните нам',
  },
  {
    number: 2,
    icon: 'ruler',
    title: 'Бесплатный замер',
    description: 'Специалист приедет, замерит и проконсультирует',
  },
  {
    number: 3,
    icon: 'file-text',
    title: 'Расчёт и договор',
    description: 'Подберём оптимальное решение, зафиксируем цену',
  },
  {
    number: 4,
    icon: 'factory',
    title: 'Производство',
    description: 'Изготовим на собственном производстве от 5 дней',
  },
  {
    number: 5,
    icon: 'wrench',
    title: 'Монтаж и гарантия',
    description: 'Профессиональная установка с гарантией',
  },
]
