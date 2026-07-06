import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import GradientBackground from './components/GradientBackground'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ScrollManager from './components/ScrollManager'
import SmoothScroll from './components/SmoothScroll'
import Home from './pages/Home'
import Contact from './pages/Contact'

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <GradientBackground />
      <SmoothScroll />
      <ScrollManager />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
