import Hero from '@/components/sections/home/Hero';
import Marquee from '@/components/ui/Marquee';
import FeaturedCollection from '@/components/sections/home/FeaturedCollection';
import StudioSection from '@/components/sections/home/StudioSection';
import Newsletter from '@/components/sections/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollection />
      <StudioSection />
      <Newsletter />
    </>
  );
}
