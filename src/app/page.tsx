import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { ServiceGrid } from '@/components/ServiceGrid'
import { RouteExplorer } from '@/components/RouteExplorer'
import { TripPlanner } from '@/components/TripPlanner'
import { InteractiveMap } from '@/components/InteractiveMap'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section id="services" aria-labelledby="services-heading">
        <ServiceGrid />
      </section>

      <section id="routes" aria-labelledby="routes-heading">
        <RouteExplorer />
      </section>

      <section id="plan" aria-labelledby="trip-planner-heading">
        <TripPlanner />
      </section>

      <section id="map" aria-label="Alberta route map">
        <InteractiveMap />
      </section>

      <Footer />
    </main>
  )
}
