export interface Advantage {
  icon: string
  title: string
  description: string
}

export const advantages: Advantage[] = [
  {
    icon: 'factory',
    title: 'Собственное производство',
    description: 'Полный контроль качества на каждом этапе. Изготовим изделие любой сложности',
  },
  {
    icon: 'ruler',
    title: 'Бесплатный замер',
    description: 'Специалист приедет в удобное время, точно замерит и проконсультирует',
  },
  {
    icon: 'shield-check',
    title: 'Гарантия на работы',
    description: 'Сервисное обслуживание и гарантия на все изделия и монтаж',
  },
  {
    icon: 'wallet',
    title: 'Рассрочка 0%',
    description: 'Предоплата 40%. Рассрочка на 3–4 месяца без переплат и скрытых комиссий',
  },
  {
    icon: 'file-check',
    title: 'Сертифицированные материалы',
    description: 'Вся продукция соответствует строительным нормам РФ',
  },
]
