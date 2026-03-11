import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Advantages } from '@/components/Advantages'
import { Calculator } from '@/components/Calculator'
import { Portfolio } from '@/components/Portfolio'
import { HowWeWork } from '@/components/HowWeWork'
import { Promo } from '@/components/Promo'
import { Reviews } from '@/components/Reviews'
import { Partners } from '@/components/Partners'
import { About } from '@/components/About'
import { Contacts } from '@/components/Contacts'
import { Footer } from '@/components/Footer'
import { MobileBottomBar } from '@/components/MobileBottomBar'
import { PrivacyPolicy } from '@/components/PrivacyPolicy'
import { CookieBanner } from '@/components/CookieBanner'

type PrivacyTab = 'privacy' | 'personal-data' | 'cookies'

function App() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const [privacyTab, setPrivacyTab] = useState<PrivacyTab>('privacy')

  const openPrivacy = (tab: PrivacyTab = 'privacy') => {
    setPrivacyTab(tab)
    setPrivacyOpen(true)
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Advantages />
        <Calculator />
        <Portfolio />
        <HowWeWork />
        <Promo />
        <Reviews />
        <Partners />
        <About />
        <Contacts onPrivacyClick={() => openPrivacy('personal-data')} />
      </main>
      <Footer onPrivacyClick={openPrivacy} />
      <MobileBottomBar />
      <PrivacyPolicy
        isOpen={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        initialTab={privacyTab}
      />
      <CookieBanner onDetailsClick={() => openPrivacy('cookies')} />
    </div>
  )
}

export default App
