'use client'

/*
 * ROUTE CARD IMAGES — Place your photos at these paths inside /public:
 *
 *   public/images/routes/calgary-banff.jpg       ← Calgary → Banff route
 *   public/images/routes/icefields-parkway.jpg   ← Banff → Jasper (featured)
 *   public/images/routes/drumheller.jpg          ← Calgary → Drumheller
 *   public/images/routes/jasper.jpg              ← Edmonton → Jasper
 *
 * Recommended size: 800×600px minimum, landscape orientation.
 * The <Image> component will crop to fill the card (aspect-[4/3]).
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Clock, MapPin, Navigation } from 'lucide-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { BookingModal } from '@/components/BookingModal'
import { formatCAD, EASE_OUT_EXPO } from '@/lib/utils'

const ROUTES = [
  {
    id: 'calgary-banff',
    from: 'Calgary',
    to: 'Banff',
    distance: '128 km',
    duration: '1.5 hrs',
    highlights: ['Bow Valley Parkway', 'Banff townsite', 'Cascade Mountain views'],
    image: '/images/routes/calgary-banff.jpg',
    price: 89,
    tags: ['Popular', 'Scenic'],
    featured: false,
  },
  {
    id: 'banff-jasper',
    from: 'Banff',
    to: 'Jasper',
    distance: '287 km',
    duration: '3.5–5 hrs',
    highlights: ['Columbia Icefields', 'Athabasca Glacier', 'Peyto Lake'],
    image: '/images/routes/icefields-parkway.jpg',
    price: 249,
    tags: ['Signature', 'Full Day'],
    featured: true,
  },
  {
    id: 'calgary-drumheller',
    from: 'Calgary',
    to: 'Drumheller',
    distance: '138 km',
    duration: '1.5 hrs',
    highlights: ['Badlands scenery', 'Hoodoo Trail', 'Royal Tyrrell Museum'],
    image: '/images/routes/drumheller.jpg',
    price: 119,
    tags: ['Unique', 'Family'],
    featured: false,
  },
  {
    id: 'edmonton-jasper',
    from: 'Edmonton',
    to: 'Jasper',
    distance: '362 km',
    duration: '4 hrs',
    highlights: ['Hinton foothills', 'Jasper National Park', 'Athabasca Falls'],
    image: '/images/routes/jasper.jpg',
    price: 299,
    tags: ['Northern Alberta'],
    featured: false,
  },
]

export function RouteExplorer() {
  const [modalRoute, setModalRoute] = useState<{ from: string; to: string } | null>(null)

  return (
    <>
      <div className="bg-stone-50 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-14">
            <h2 id="routes-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mb-4">
              Explore Our Routes
            </h2>
            <p className="text-stone-900/60 text-lg max-w-xl mx-auto">
              Hand-picked journeys across Alberta&apos;s most breathtaking landscapes.
            </p>
          </div>

          {/* Route grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {ROUTES.map((route, index) => (
              <motion.article
                key={route.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: EASE_OUT_EXPO }}
                className={`group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col ${
                  route.featured ? 'xl:col-span-2' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: route.featured ? '16/9' : '4/3' }}
                  whileHover="hovered"
                >
                  <motion.div
                    variants={{ hovered: { scale: 1.06 } }}
                    transition={{ duration: 0.45, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={route.image}
                      alt={`${route.from} to ${route.to} route`}
                      fill
                      className="object-cover"
                      sizes={route.featured
                        ? '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px'
                        : '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 280px'
                      }
                    />
                  </motion.div>

                  {/* Tags overlay */}
                  <div className="absolute top-3 left-3 flex gap-1.5 z-10">
                    {route.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-pine-dark/75 text-white px-2 py-0.5 rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Route name */}
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-bold text-stone-900 text-lg">{route.from}</h3>
                    <ArrowRight className="w-4 h-4 text-stone-400 flex-shrink-0" />
                    <h3 className="font-bold text-stone-900 text-lg">{route.to}</h3>
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-stone-500 mb-4">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3.5 h-3.5" />
                      {route.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {route.duration}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {route.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                    <div>
                      <div className="text-xs text-stone-400 mb-0.5">From</div>
                      <div className="text-xl font-bold text-stone-900">
                        {formatCAD(route.price)}
                        <span className="text-xs text-stone-400 font-normal ml-1">CAD</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setModalRoute({ from: route.from, to: route.to })}
                      className="bg-pine text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-pine-light transition-colors"
                    >
                      Book Route
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      {/* Booking modal */}
      <AnimatePresence>
        {modalRoute && (
          <BookingModal
            open={!!modalRoute}
            onClose={() => setModalRoute(null)}
            prefilledRoute={modalRoute}
          />
        )}
      </AnimatePresence>
    </>
  )
}
