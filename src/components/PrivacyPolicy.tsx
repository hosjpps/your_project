import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Tab = 'privacy' | 'personal-data' | 'cookies'

interface PrivacyPolicyProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: Tab
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'privacy', label: 'Конфиденциальность' },
  { id: 'personal-data', label: 'Персональные данные' },
  { id: 'cookies', label: 'Cookies' },
]

export function PrivacyPolicy({ isOpen, onClose, initialTab = 'privacy' }: PrivacyPolicyProps) {
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab)
      document.body.style.overflow = 'hidden'
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      window.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = ''
        window.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, initialTab])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with tabs */}
        <div className="flex items-center justify-between px-6 md:px-8 pt-6 pb-0">
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer',
                  activeTab === tab.id
                    ? 'bg-primary/10 text-primary'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-50',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0 ml-2"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 md:px-8 py-6">
          {activeTab === 'privacy' && <PrivacyContent />}
          {activeTab === 'personal-data' && <PersonalDataContent />}
          {activeTab === 'cookies' && <CookiesContent />}
        </div>
      </div>
    </div>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-text-primary mt-6 mb-2">{children}</h3>
}

function PrivacyContent() {
  return (
    <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
      <h2 className="text-xl font-bold text-text-primary mb-4">
        Политика конфиденциальности
      </h2>
      <p>
        Настоящая Политика конфиденциальности (далее — Политика) определяет порядок обработки
        и защиты информации о физических лицах (далее — Пользователи), которую ООО «Свой Проект»
        (ИНН: XXXXXXXXXX, ОГРН: XXXXXXXXXXXXX, адрес: г. Выкса, ул. Красные Зори, 31;
        далее — Оператор) получает при использовании сайта.
      </p>
      <p>
        Политика разработана в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ
        «О персональных данных» и иными нормативными актами Российской Федерации.
      </p>

      <SectionHeading>1. Общие положения</SectionHeading>
      <p>
        1.1. Настоящая Политика действует в отношении всех персональных данных, которые Оператор
        может получить от Пользователя во время использования сайта.
      </p>
      <p>
        1.2. Использование сайта означает безоговорочное согласие Пользователя с настоящей
        Политикой и указанными в ней условиями обработки персональных данных.
      </p>
      <p>
        1.3. В случае несогласия с условиями Политики Пользователь должен прекратить использование сайта.
      </p>

      <SectionHeading>2. Персональные данные, обрабатываемые Оператором</SectionHeading>
      <p>Оператор обрабатывает следующие персональные данные:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Фамилия, имя</li>
        <li>Номер телефона</li>
        <li>Адрес электронной почты (при указании)</li>
        <li>Содержание обращения / комментария (при указании)</li>
        <li>Данные об используемом браузере, IP-адрес, файлы cookies</li>
      </ul>

      <SectionHeading>3. Цели обработки персональных данных</SectionHeading>
      <ul className="list-disc pl-5 space-y-1">
        <li>Обратная связь с Пользователем (звонок, сообщение)</li>
        <li>Подготовка коммерческого предложения и расчёта стоимости</li>
        <li>Назначение выезда специалиста для замера</li>
        <li>Заключение и исполнение договора на оказание услуг</li>
        <li>Улучшение качества обслуживания и работы сайта</li>
        <li>Проведение статистических исследований</li>
      </ul>

      <SectionHeading>4. Правовые основания обработки</SectionHeading>
      <p>Обработка персональных данных осуществляется на основании:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Согласия Пользователя на обработку персональных данных (ст. 6 ч. 1 п. 1 №152-ФЗ)</li>
        <li>Необходимости исполнения договора (ст. 6 ч. 1 п. 5 №152-ФЗ)</li>
        <li>Необходимости осуществления прав и законных интересов Оператора (ст. 6 ч. 1 п. 7 №152-ФЗ)</li>
      </ul>

      <SectionHeading>5. Защита персональных данных</SectionHeading>
      <p>
        Оператор принимает необходимые и достаточные организационные и технические меры для
        защиты персональных данных от неправомерного доступа, уничтожения, изменения,
        блокирования, копирования, распространения, а также от иных неправомерных действий
        третьих лиц.
      </p>

      <SectionHeading>6. Передача персональных данных третьим лицам</SectionHeading>
      <p>
        6.1. Оператор не передаёт персональные данные третьим лицам, за исключением случаев,
        прямо предусмотренных законодательством Российской Федерации.
      </p>
      <p>
        6.2. Передача персональных данных органам государственной власти осуществляется
        в соответствии с требованиями законодательства РФ.
      </p>

      <SectionHeading>7. Сроки обработки персональных данных</SectionHeading>
      <p>
        Персональные данные обрабатываются до момента достижения целей обработки или до
        отзыва согласия Пользователем. Пользователь может в любой момент отозвать своё
        согласие, направив уведомление на адрес электронной почты:{' '}
        <a href="mailto:svoy.proekt@mail.ru" className="text-accent hover:underline">
          svoy.proekt@mail.ru
        </a>
      </p>

      <SectionHeading>8. Права Пользователя</SectionHeading>
      <p>Пользователь имеет право:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Получить информацию об обработке своих персональных данных</li>
        <li>Требовать уточнения, блокирования или уничтожения персональных данных</li>
        <li>Отозвать согласие на обработку персональных данных</li>
        <li>Обжаловать действия Оператора в Роскомнадзор или в судебном порядке</li>
      </ul>

      <SectionHeading>9. Изменение Политики</SectionHeading>
      <p>
        Оператор вправе вносить изменения в настоящую Политику. Новая редакция вступает
        в силу с момента её размещения на сайте.
      </p>

      <p className="text-xs text-text-secondary/50 mt-8 pt-4 border-t border-gray-100">
        Дата последнего обновления: март 2026 г.
      </p>
    </div>
  )
}

function PersonalDataContent() {
  return (
    <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
      <h2 className="text-xl font-bold text-text-primary mb-4">
        Согласие на обработку персональных данных
      </h2>

      <p>
        Заполняя формы на сайте и нажимая кнопку отправки, Пользователь подтверждает, что
        действует свободно, своей волей и в своём интересе, и даёт своё согласие ООО «Свой Проект»
        (адрес: г. Выкса, ул. Красные Зори, 31) на обработку персональных данных на следующих условиях:
      </p>

      <SectionHeading>1. Перечень персональных данных</SectionHeading>
      <ul className="list-disc pl-5 space-y-1">
        <li>Фамилия, имя, отчество</li>
        <li>Номер контактного телефона</li>
        <li>Адрес электронной почты</li>
        <li>Адрес объекта (при указании для выезда на замер)</li>
        <li>Содержание обращения</li>
      </ul>

      <SectionHeading>2. Цели обработки</SectionHeading>
      <ul className="list-disc pl-5 space-y-1">
        <li>Идентификация Пользователя</li>
        <li>Связь с Пользователем для обработки заявки</li>
        <li>Направление коммерческого предложения</li>
        <li>Организация выезда специалиста для замера</li>
        <li>Заключение и исполнение договора</li>
        <li>Информирование об акциях и специальных предложениях (при согласии)</li>
      </ul>

      <SectionHeading>3. Способы обработки</SectionHeading>
      <p>
        Обработка персональных данных осуществляется с использованием средств автоматизации
        и/или без использования таких средств, включая: сбор, запись, систематизацию,
        накопление, хранение, уточнение (обновление, изменение), извлечение, использование,
        передачу (распространение, предоставление, доступ), обезличивание, блокирование,
        удаление, уничтожение.
      </p>

      <SectionHeading>4. Срок действия согласия</SectionHeading>
      <p>
        Согласие действует до момента его отзыва Пользователем. Отзыв согласия осуществляется
        путём направления письменного заявления на адрес электронной почты:{' '}
        <a href="mailto:svoy.proekt@mail.ru" className="text-accent hover:underline">
          svoy.proekt@mail.ru
        </a>{' '}
        или почтовым отправлением по адресу: г. Выкса, ул. Красные Зори, 31.
      </p>

      <SectionHeading>5. Ответственность</SectionHeading>
      <p>
        В случае неправомерного использования предоставленных персональных данных Оператор
        несёт ответственность в соответствии с законодательством Российской Федерации.
      </p>

      <SectionHeading>6. Правовое основание</SectionHeading>
      <p>
        Настоящее согласие дано в соответствии с Федеральным законом от 27.07.2006 №152-ФЗ
        «О персональных данных», Федеральным законом от 13.03.2006 №38-ФЗ «О рекламе»,
        иными нормативными правовыми актами Российской Федерации.
      </p>

      <p className="text-xs text-text-secondary/50 mt-8 pt-4 border-t border-gray-100">
        Дата последнего обновления: март 2026 г.
      </p>
    </div>
  )
}

function CookiesContent() {
  return (
    <div className="text-sm text-text-secondary space-y-3 leading-relaxed">
      <h2 className="text-xl font-bold text-text-primary mb-4">
        Политика использования файлов cookies
      </h2>

      <SectionHeading>1. Что такое cookies</SectionHeading>
      <p>
        Файлы cookies — это небольшие текстовые файлы, которые сохраняются на вашем устройстве
        (компьютере, смартфоне, планшете) при посещении сайта. Cookies не содержат вирусов и
        не могут быть использованы для установки вредоносного программного обеспечения.
      </p>

      <SectionHeading>2. Какие cookies мы используем</SectionHeading>

      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <div>
          <p className="font-medium text-text-primary">Необходимые cookies</p>
          <p className="text-xs mt-0.5">
            Обеспечивают базовую функциональность сайта. Без них сайт не может работать корректно.
            Не могут быть отключены.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <p className="font-medium text-text-primary">Аналитические cookies</p>
          <p className="text-xs mt-0.5">
            Помогают понять, как посетители взаимодействуют с сайтом. Информация собирается
            в обезличенном виде (Яндекс.Метрика).
          </p>
        </div>
        <div className="border-t border-gray-200 pt-3">
          <p className="font-medium text-text-primary">Функциональные cookies</p>
          <p className="text-xs mt-0.5">
            Запоминают ваши предпочтения и настройки для более комфортного использования сайта.
          </p>
        </div>
      </div>

      <SectionHeading>3. Срок хранения cookies</SectionHeading>
      <p>
        Сессионные cookies удаляются после закрытия браузера. Постоянные cookies хранятся
        на вашем устройстве в течение определённого срока (как правило, не более 1 года)
        или до момента их удаления вами вручную.
      </p>

      <SectionHeading>4. Как управлять cookies</SectionHeading>
      <p>
        Вы можете управлять cookies через настройки вашего браузера:
      </p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Просматривать и удалять отдельные cookies</li>
        <li>Блокировать cookies от определённых сайтов</li>
        <li>Блокировать все cookies</li>
        <li>Удалять все cookies при закрытии браузера</li>
      </ul>
      <p>
        Обратите внимание: блокировка cookies может привести к некорректной работе отдельных
        функций сайта.
      </p>

      <SectionHeading>5. Правовое основание</SectionHeading>
      <p>
        Использование cookies осуществляется в соответствии с Федеральным законом от 27.07.2006
        №149-ФЗ «Об информации, информационных технологиях и о защите информации» и Федеральным
        законом от 27.07.2006 №152-ФЗ «О персональных данных».
      </p>

      <SectionHeading>6. Согласие</SectionHeading>
      <p>
        Продолжая использовать сайт, вы подтверждаете своё согласие на использование файлов
        cookies в соответствии с настоящей Политикой. Если вы не согласны с использованием
        cookies, вы можете отключить их в настройках браузера или покинуть сайт.
      </p>

      <p className="text-xs text-text-secondary/50 mt-8 pt-4 border-t border-gray-100">
        Дата последнего обновления: март 2026 г.
      </p>
    </div>
  )
}
