'use client'

/*
 * HERO ASSETS — Place your files at these paths inside /public:
 *
 * Video background:
 *   public/videos/hero.mp4       ← primary video (MP4)
 *   public/videos/hero.webm      ← WebM version for better compression
 *
 * Poster image (shown while video loads / on slow connections):
 *   public/images/hero-poster.jpg
 *
 * The <video> will auto-play, loop silently on all devices.
 */

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Star, Users, Clock } from 'lucide-react'
import { BookingModal } from '@/components/BookingModal'

const ALBERTA_CITIES = [
  'Calgary YYC Airport', 'Banff', 'Canmore', 'Jasper',
  'Lake Louise', 'Drumheller', 'Edmonton YEG Airport',
  'Calgary Downtown', 'Icefields Parkway',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
}

const TRUST_STATS = [
  { icon: Star, value: '4.9★', label: '284 reviews' },
  { icon: Users, value: '10K+', label: 'Happy guests' },
  { icon: Clock, value: '24/7', label: 'Available' },
]

export function Hero() {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [date, setDate] = useState('')
  const [passengers, setPassengers] = useState(2)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 600], [0, 180])

  const handleCheckAvailability = () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="relative min-h-screen overflow-hidden flex items-center">
        {/* ── Video background ── */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero-poster.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
            <source src="/videos/hero.webm" type="video/webm" />
          </video>
        </div>

        {/* ── Gradient overlay ── */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-pine/40 via-pine/20 to-pine/70" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-pine/50 via-transparent to-transparent" />

        {/* ── Content ── */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Hero text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{ y: heroY }}
            >
              {/* Eyebrow */}
              <motion.div variants={itemVariants} className="flex items-center gap-2 mb-5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-white/80 text-sm font-medium">
                  Alberta&apos;s Premier Private Transport
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5"
              >
                Journey Through
                <br />
                <span className="text-gold">the Rockies</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={itemVariants}
                className="text-lg text-white/75 leading-relaxed max-w-lg mb-8"
              >
                Private tours, airport transfers, and chartered adventures across Alberta.
                Banff, Jasper, Drumheller — wherever your road leads.
              </motion.p>

              {/* Trust stats */}
              <motion.div variants={itemVariants} className="flex items-center gap-6">
                {TRUST_STATS.map(({ icon: Icon, value, label }) => (
                  <div key={value} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-gold" />
                    </div>
                    <div className="leading-none">
                      <div className="text-white font-semibold text-sm">{value}</div>
                      <div className="text-white/50 text-xs">{label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Booking widget */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="glass-card-booking rounded-2xl p-6 lg:p-8">
                <h2 className="text-white font-bold text-xl mb-1">Plan Your Journey</h2>
                <p className="text-white/50 text-sm mb-5">Get a quote in seconds — no booking fees</p>

                {/* From / To */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="text-white/70 text-xs mb-1 block">From</label>
                    <input
                      list="hero-cities-from"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="Calgary"
                      className="w-full h-10 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-glacial"
                    />
                    <datalist id="hero-cities-from">
                      {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                  <div>
                    <label className="text-white/70 text-xs mb-1 block">To</label>
                    <input
                      list="hero-cities-to"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Banff"
                      className="w-full h-10 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-glacial"
                    />
                    <datalist id="hero-cities-to">
                      {ALBERTA_CITIES.map((c) => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                </div>

                {/* Date */}
                <div className="mb-3">
                  <label className="text-white/70 text-xs mb-1 block">Travel Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-10 rounded-lg border border-white/20 bg-white/10 px-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-glacial [color-scheme:dark]"
                  />
                </div>

                {/* Passengers */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-white/70 text-xs">Passengers</label>
                    <span className="text-white font-semibold text-sm">{passengers}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={14}
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full bg-white/20 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow"
                  />
                  <div className="flex justify-between text-white/30 text-xs mt-1">
                    <span>1</span>
                    <span>14 passengers</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleCheckAvailability}
                  className="relative w-full bg-gold text-pine-dark font-bold py-3.5 rounded-xl text-sm hover:bg-gold-dark transition-all hover:shadow-lg hover:shadow-gold/30 overflow-hidden"
                >
                  Check Availability
                </button>

                <p className="text-white/40 text-xs text-center mt-3">
                  No booking fees · Free cancellation 24h before
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="text-gold/70 w-7 h-7" />
        </motion.div>
      </section>

      {/* Booking modal */}
      <BookingModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefilledRoute={from && to ? { from, to } : undefined}
      />
    </>
  )
}
