import ContextBanner from './components/ContextBanner'
import Hero from './components/Hero'
import WhyExists from './components/WhyExists'
import HowToParticipate from './components/HowToParticipate'
import LiveFeed from './components/LiveFeed'
import ExamplePosts from './components/ExamplePosts'
import BiggerPicture from './components/BiggerPicture'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <main>
      <ContextBanner />
      <Hero />
      <WhyExists />
      <HowToParticipate />
      <LiveFeed />
      <ExamplePosts />
      <BiggerPicture />
      <FinalCTA />
      <Footer />
    </main>
  )
}
