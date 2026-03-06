import { SEO } from '../components/ui/SEO'
import { Hero } from '../components/home/Hero'
import { FeaturedProjects } from '../components/home/FeaturedProjects'

export function Home() {
  return (
    <>
      <SEO url="/" />
      <Hero />
      <FeaturedProjects />
    </>
  )
}
