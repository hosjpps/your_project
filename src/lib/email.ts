const WEB3FORMS_KEY = '62ddf639-66b5-4f64-a94c-7239838e3fba'

interface LeadData {
  name: string
  phone: string
  email?: string | null
  comment?: string | null
  source?: string
}

export async function sendLeadEmail(data: LeadData): Promise<void> {
  try {
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: `Новая заявка с сайта — ${data.source || 'Форма «Контакты»'}`,
        from_name: 'Сайт «Свой Проект»',
        Имя: data.name,
        Телефон: data.phone,
        Email: data.email || '—',
        Комментарий: data.comment || '—',
        Источник: data.source || 'Форма «Контакты»',
        Время: new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' }),
      }),
    })
  } catch (err) {
    console.error('Email notification failed', err)
  }
}
