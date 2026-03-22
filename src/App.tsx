import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Advantages } from '@/components/Advantages'
import { Portfolio } from '@/components/Portfolio'
import { HowWeWork } from '@/components/HowWeWork'
import { Promo } from '@/components/Promo'
import { Reviews } from '@/components/Reviews'
import { Partners } from '@/components/Partners'
import { Contacts } from '@/components/Contacts'
import { Footer } from '@/components/Footer'
import { MobileBottomBar } from '@/components/MobileBottomBar'
import { PrivacyPolicy } from '@/components/PrivacyPolicy'
import { CookieBanner } from '@/components/CookieBanner'
import { AdminLogin } from '@/admin/AdminLogin'
import { AdminLayout } from '@/admin/AdminLayout'
import { AdminDashboard } from '@/admin/AdminDashboard'
import { AdminSubmissions } from '@/admin/AdminSubmissions'
import { AdminReviews } from '@/admin/AdminReviews'
import { AdminPortfolio } from '@/admin/AdminPortfolio'

type PrivacyTab = 'privacy' | 'personal-data' | 'cookies'

function LandingPage() {
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
        <Portfolio />
        <HowWeWork />
        <Promo />
        <Reviews />
        <Partners />
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="submissions" element={<AdminSubmissions />} />
        <Route path="reviews" element={<AdminReviews />} />
        <Route path="portfolio" element={<AdminPortfolio />} />
      </Route>
    </Routes>
  )
}

export default App
