'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X, Mountain } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Routes', href: '#routes' },
  { label: 'Plan My Trip', href: '#plan' },
  { label: 'Map', href: '#map' },
]

const drawerVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
}

const linkVariants = {
  closed: { x: -20, opacity: 0 },
  open: { x: 0, opacity: 1 },
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glass-nav' : 'bg-transparent'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
              <Mountain className="w-5 h-5 text-pine-dark" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-base tracking-tight">Road Trip</span>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase">Alberta</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white/80 hover:text-white text-sm font-medium transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </button>
            ))}

            {/* Book Now CTA */}
            <button
              onClick={() => scrollToSection('#plan')}
              className="relative bg-gold text-pine-dark font-semibold px-5 py-2 rounded-full text-sm hover:bg-gold-dark transition-colors duration-200 overflow-hidden group"
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 rounded-full ring-2 ring-gold/50 animate-ping opacity-75" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <motion.button
                    key={link.href}
                    variants={linkVariants}
                    onClick={() => scrollToSection(link.href)}
                    className="block w-full text-left px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  variants={linkVariants}
                  onClick={() => scrollToSection('#plan')}
                  className="block w-full mt-3 bg-gold text-pine-dark font-semibold px-4 py-3 rounded-xl text-sm text-center"
                >
                  Book Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
