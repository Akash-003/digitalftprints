import PageWrap from '../components/PageWrap'
import Hero from '../sections/Hero'
import Marquee from '../sections/Marquee'
import Services from '../sections/Services'
import Work from '../sections/Work'
import Stats from '../sections/Stats'
import CTA from '../sections/CTA'

export default function Home() {
  return (
    <PageWrap>
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Stats />
      <CTA />
    </PageWrap>
  )
}
