import { Mountain, Phone, Mail, Instagram, Facebook } from 'lucide-react'

const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Road Trip Alberta',
  description: 'Premium private tours and transport across Alberta',
  '@id': 'https://roadtripalberta.ca',
  url: 'https://roadtripalberta.ca',
  telephone: '+1-403-555-0100',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Calgary',
    addressRegion: 'AB',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.0447,
    longitude: -114.0719,
  },
  areaServed: ['Calgary', 'Banff', 'Jasper', 'Drumheller', 'Edmonton', 'Canmore', 'Lake Louise'],
  priceRange: '$$$',
  openingHours: 'Mo-Su 00:00-24:00',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '284',
  },
}

export function Footer() {
  return (
    <footer className="bg-pine-dark text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-glacial/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
                <Mountain className="w-5 h-5 text-pine-dark" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-base tracking-tight">Road Trip</span>
                <span className="text-gold text-xs font-semibold tracking-widest uppercase">Alberta</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Alberta&apos;s most trusted private transport — from Banff to the Badlands, we&apos;ll take you there in style.
            </p>

            {/* Contact */}
            <div className="space-y-2 mb-5">
              <a href="tel:+14035550100" className="flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +1 (403) 555-0100
              </a>
              <a href="mailto:hello@roadtripalberta.ca" className="flex items-center gap-2 text-sm text-white/70 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" />
                hello@roadtripalberta.ca
              </a>
            </div>

            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold/20 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Services</h3>
            <ul className="space-y-2.5">
              {['Private Tours', 'Airport Shuttles', 'Chartered Events', 'Corporate Travel', 'Wedding Transport'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-sm text-white/60 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Destinations</h3>
            <ul className="space-y-2.5">
              {['Banff National Park', 'Jasper National Park', 'Drumheller Badlands', 'Lake Louise', 'Canmore', 'Edmonton'].map((item) => (
                <li key={item}>
                  <a href="#routes" className="text-sm text-white/60 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              {['About Us', 'Safety Standards', 'Fleet', 'Reviews', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-white/60 hover:text-gold transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-glacial/10">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
          <div className="flex items-center gap-1.5">
            <span className="text-gold">★★★★★</span>
            <span>4.9 Google Reviews (284)</span>
          </div>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <span>Alberta Tourism Certified</span>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <span>Transport Canada Licensed</span>
          <div className="w-px h-4 bg-white/20 hidden sm:block" />
          <span>Fully Insured &amp; Bonded</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-sm text-white/40">
          © {new Date().getFullYear()} Road Trip Alberta. Licensed &amp; Insured. Alberta Tourism Certified.
        </p>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </footer>
  )
}
