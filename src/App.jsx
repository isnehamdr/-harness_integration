import { useLayoutEffect } from 'react'
import './App.css'
import Navbar from './Component/Navbar'
import Home from './Pages/Home'
import AboutPage from './Pages/AboutPage'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Footer from './Component/Footer'
import BackToTop from './Component/BackToTop'
import RoomPage from './Pages/RoomPage'
import ActivityPage from './Pages/ActivityPage'
import ServicePage from './Pages/ServicePage'
import ServiceDetail from './Pages/ServiceDetail'
import Blog from './Pages/Blog'
import GalleryPage from './Pages/GallerPage'
import RoomDetail from './Pages/RoomDetail'
import ContactPage from './Pages/ContactPage'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ActivityDetail from './Pages/ActivityDetail'
import CarrerPage from './Pages/CarrerPage'
import BlogDetail from './Pages/BlogDetail'
import Booking from './Pages/Booking'

const RouteLifecycle = () => {
  const location = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [location.pathname])

  return null
}

function App() {
  return (
    <Router>
      <RouteLifecycle />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/rooms" element={<RoomPage />} />
        <Route path="/rooms/:slug" element={<RoomDetail />} />
        <Route path="/activity" element={<Navigate to="/activities" replace />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/activities/:slug" element={<ActivityDetail />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/career" element={<Navigate to="/careers" replace />} />
        <Route path="/careers" element={<CarrerPage />} />
        <Route path="/booking" element={<Booking />} />
      </Routes>

      <BackToTop />
      <Footer />
    </Router>
  )
}

export default App
