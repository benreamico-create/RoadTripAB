'use client'

/*
 * INTERACTIVE MAP
 * Currently shows a stylised static placeholder with animated city pins.
 *
 * TODO — Mapbox Integration:
 *  1. npm install mapbox-gl @types/mapbox-gl
 *  2. Add NEXT_PUBLIC_MAPBOX_TOKEN to .env.local
 *  3. Replace the placeholder <div> below with:
 *       <div ref={mapContainer} id="mapbox-container" className="w-full h-full" />
 *  4. In a useEffect, initialise:
 *       const map = new mapboxgl.Map({
 *         container: mapContainer.current!,
 *         style: 'mapbox://styles/mapbox/outdoors-v12',
 *         center: [-115.5, 52.5],
 *         zoom: 6,
 *       })
 *  5. Add route GeoJSON lines + custom marker elements for each city pin.
 */

import { useState } from 'react'
import { motion } from 'motion/react'
import { MapPin, ArrowRight } from 'lucide-react'

const PINS = [
  { id: 'calgary', label: 'Calgary', left: '42%', top: '78%' },
  { id: 'banff', label: 'Banff', left: '28%', top: '68%' },
  { id: 'canmore', label: 'Canmore', left: '31%', top: '71%' },
  { id: 'jasper', label: 'Jasper', left: '22%', top: '45%' },
  { id: 'lake-louise', label: 'Lake Louise', left: '26%', top: '60%' },
  { id: 'drumheller', label: 'Drumheller', left: '56%', top: '72%' },
  { id: 'edmonton', label: 'Edmonton', left: '47%', top: '38%' },
]

const QUICK_ROUTES = [
  { from: 'Calgary', to: 'Banff', price: '$89' },
  { from: 'Banff', to: 'Jasper', price: '$249' },
  { from: 'Calgary', to: 'Drumheller', price: '$119' },
  { from: 'Edmonton', to: 'Jasper', price: '$299' },
]

export function InteractiveMap() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <div className="bg-stone-100 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
            We Go Everywhere in Alberta
          </h2>
          <p className="text-stone-900/60 text-lg max-w-xl mx-auto">
            From the Rockies to the Badlands — hover the map to explore our coverage area.
          </p>
        </div>

        {/* Map container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#2A4A35]" style={{ height: '500px' }}>
          {/* Alberta silhouette / map placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <svg viewBox="0 0 300 400" className="h-full text-white fill-current">
              {/* Simple Alberta shape approximation */}
              <path d="M 60 20 L 240 20 L 240 60 L 260 60 L 260 380 L 60 380 Z" />
            </svg>
          </div>

          {/* Grid lines for map aesthetic */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(164,216,225,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(164,216,225,0.4) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {/* Label */}
          <div className="absolute top-4 left-4 text-white/40 text-xs font-mono tracking-widest uppercase">
            Alberta, Canada
          </div>

          {/* City pins */}
          {PINS.map((pin) => (
            <div
              key={pin.id}
              className="absolute group cursor-pointer"
              style={{ left: pin.left, top: pin.top, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setHovered(pin.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-[-8px] rounded-full bg-gold/30"
                animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeOut', delay: Math.random() * 1.5 }}
              />

              {/* Pin dot */}
              <div className={`w-4 h-4 rounded-full border-2 border-white shadow-lg relative z-10 transition-all duration-200 ${
                hovered === pin.id ? 'bg-gold scale-125' : 'bg-gold/80'
              }`} />

              {/* Tooltip */}
              {hovered === pin.id && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap glass-card rounded-lg px-3 py-1.5 text-white text-xs font-semibold shadow-lg pointer-events-none z-20"
                >
                  <MapPin className="w-3 h-3 inline mr-1 text-gold" />
                  {pin.label}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
                </motion.div>
              )}
            </div>
          ))}

          {/* "Coming soon" overlay badge */}
          <div className="absolute bottom-4 right-4 glass-card-booking rounded-xl px-4 py-3 max-w-[220px]">
            <p className="text-white text-xs font-semibold mb-1">Interactive Map</p>
            <p className="text-white/50 text-xs">Full Mapbox integration coming soon.</p>
            <button
              onClick={() => document.querySelector('#plan')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-2 text-gold text-xs font-bold hover:underline"
            >
              Book any Alberta route →
            </button>
          </div>
        </div>

        {/* Quick route links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
          {QUICK_ROUTES.map((r) => (
            <button
              key={`${r.from}-${r.to}`}
              onClick={() => document.querySelector('#plan')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:bg-pine hover:text-white transition-all duration-200 group text-sm"
            >
              <span className="text-stone-700 group-hover:text-white font-medium">
                {r.from} <ArrowRight className="w-3 h-3 inline" /> {r.to}
              </span>
              <span className="text-gold font-bold">{r.price}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
