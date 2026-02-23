'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { MapPin, Plane, Star, CheckCircle } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { formatCAD } from '@/lib/utils'

const SERVICES = [
  {
    id: 'private-tours',
    icon: MapPin,
    title: 'Private Tours',
    description:
      'Exclusive guided journeys along the Icefields Parkway, Banff National Park, and Lake Louise with a professional local guide.',
    features: [
      'Professional bilingual guide',
      'Flexible, custom itinerary',
      'Premium luxury vehicles',
      'Stop anywhere, anytime',
    ],
    sharedPrice: 149,
    privatePrice: 899,
    sharedLabel: 'per person',
    privateLabel: 'private group',
    badge: 'Most Popular',
    badgeVariant: 'glacial' as const,
    accentClass: 'from-glacial/20 to-transparent',
    borderHover: 'group-hover:border-glacial/40',
  },
  {
    id: 'airport-shuttles',
    icon: Plane,
    title: 'Airport Transfers',
    description:
      'Reliable door-to-door transfers from YYC Calgary and YEG Edmonton airports to any Alberta destination.',
    features: [
      'Real-time flight tracking',
      'Meet & greet with name sign',
      'Luggage assistance',
      'No hidden surge pricing',
    ],
    sharedPrice: 79,
    privatePrice: 249,
    sharedLabel: 'shared shuttle',
    privateLabel: 'private transfer',
    badge: null,
    badgeVariant: 'gold' as const,
    accentClass: 'from-gold/20 to-transparent',
    borderHover: 'group-hover:border-gold/40',
  },
  {
    id: 'chartered-events',
    icon: Star,
    title: 'Chartered Events',
    description:
      'Corporate retreats, weddings, ski trips, and group adventures — custom multi-vehicle solutions for any occasion.',
    features: [
      'Custom branding & signage',
      'Event coordination support',
      'Multi-vehicle fleets',
      'Dedicated account manager',
    ],
    sharedPrice: 1200,
    privatePrice: 2800,
    sharedLabel: 'starting from',
    privateLabel: 'full day charter',
    badge: 'Premium',
    badgeVariant: 'gold' as const,
    accentClass: 'from-pine-light/40 to-transparent',
    borderHover: 'group-hover:border-glacial/30',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export function ServiceGrid() {
  const [isPrivate, setIsPrivate] = useState(false)

  return (
    <div className="bg-pine py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14">
          <h2 id="services-heading" className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
            From airport arrivals to mountain adventures — we handle the drive so you can enjoy the journey.
          </p>

          {/* Pricing toggle */}
          <div className="inline-flex items-center gap-3 glass-card-dark rounded-full px-5 py-3">
            <span className={`text-sm font-medium transition-colors ${isPrivate ? 'text-white/40' : 'text-white'}`}>
              Shared
            </span>
            <Switch checked={isPrivate} onCheckedChange={setIsPrivate} />
            <span className={`text-sm font-medium transition-colors ${isPrivate ? 'text-white' : 'text-white/40'}`}>
              Private
            </span>
            <span className="ml-1 text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full font-medium">
              Best Value
            </span>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`glass-card-dark rounded-2xl p-8 cursor-default group relative overflow-hidden border border-transparent ${service.borderHover} transition-colors duration-300`}
              >
                {/* Top gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${service.accentClass} pointer-events-none`} />

                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-5 right-5">
                    <Badge variant={service.badgeVariant} className="text-xs font-semibold">
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-xl mb-3">{service.title}</h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed mb-5">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-7">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/75">
                        <CheckCircle className="w-4 h-4 text-glacial flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t border-white/10 pt-5 flex items-end justify-between">
                    <div>
                      <div className="text-white/50 text-xs mb-1">
                        {isPrivate ? service.privateLabel : service.sharedLabel}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <AnimatePresence mode="wait">
                          <motion.span
                            key={isPrivate ? 'private' : 'shared'}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="text-3xl font-bold text-white"
                          >
                            {formatCAD(isPrivate ? service.privatePrice : service.sharedPrice)}
                          </motion.span>
                        </AnimatePresence>
                        <span className="text-white/40 text-xs">CAD</span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        document.querySelector('#plan')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="bg-gold/20 hover:bg-gold text-gold hover:text-pine-dark text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
                    >
                      Book →
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
