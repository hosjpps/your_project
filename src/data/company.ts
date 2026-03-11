export const company = {
  name: 'Свой Проект',
  fullName: 'Оконная компания «Свой Проект»',
  since: 2008,
  city: 'Выкса',
  region: 'Нижегородская область',
  address: 'г. Выкса, ул. Красные Зори, 31',
  phones: [
    { number: '+7 (929) 050-55-58', raw: '+79290505558', primary: true },
    { number: '+7 (930) 717-78-77', raw: '+79307177877' },
    { number: '+7 (83177) 6-14-50', raw: '+78317761450' },
    { number: '+7 (83177) 3-99-77', raw: '+78317739977' },
  ],
  email: 'svoy.proekt@mail.ru',
  workHours: {
    weekdays: '09:00 – 17:00',
    saturday: '09:00 – 14:00',
    sunday: 'выходной',
  },
  stats: {
    installations: '3000+',
    yearsExperience: '15+',
  },
  yandexMapEmbed:
    'https://yandex.ru/map-widget/v1/?um=constructor%3A&source=constructorLink&ll=42.178827%2C55.316946&z=16&pt=42.178827%2C55.316946%2Cpm2rdm',
  yandexMapLink: 'https://yandex.ru/maps/?ll=42.178827%2C55.316946&z=16&pt=42.178827%2C55.316946',
  twoGisLink: 'https://2gis.ru/vyksa/search/%D1%83%D0%BB.%20%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D1%8B%D0%B5%20%D0%97%D0%BE%D1%80%D0%B8%2C%2031',
} as const
