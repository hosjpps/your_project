export const company = {
  name: 'Свой Проект',
  fullName: 'Оконная компания «Свой Проект»',
  since: 2008,
  city: 'Выкса',
  region: 'Нижегородская область',
  address: 'г. Выкса, ул. Красные Зори, 31',
  phones: [
    { number: '+7 (929) 050-55-58', raw: '+79290505558', primary: true },
    { number: '+7 (930) 717-78-77', raw: '+79307177877', primary: false },
    { number: '+7 (83177) 6-14-50', raw: '+78317761450', primary: false },
    { number: '+7 (83177) 3-99-77', raw: '+78317739977', primary: false },
  ],
  email: 'svoy.proekt@mail.ru',
  workHours: {
    weekdays: '09:00 – 17:00',
    saturday: '09:00 – 14:00',
    sunday: 'выходной',
  },
  stats: {
    yearsExperience: '15+',
  },
  yandexMapEmbed:
    'https://yandex.ru/map-widget/v1/?ll=42.178827%2C55.316946&z=16&pt=42.178827%2C55.316946%2Cpm2rdm',
  yandexMapLink: 'https://yandex.ru/maps/-/CHEbr08t',
  twoGisLink: 'https://2gis.ru/vyksa/geo/70030076151952383',
} as const
