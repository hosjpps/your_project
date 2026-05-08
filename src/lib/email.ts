const NOTIFICATION_EMAIL = 'svoy.proekt@mail.ru'

interface LeadData {
  name: string
  phone: string
  email?: string | null
  comment?: string | null
  source?: string
}

export async function sendLeadEmail(data: LeadData): Promise<void> {
  try {
    await fetch(`https://formsubmit.co/ajax/${NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `Новая заявка с сайта${data.source ? ` — ${data.source}` : ''}`,
        _template: 'table',
        _captcha: 'false',
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
