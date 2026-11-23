import { MarqueeBand } from "./_components/marquee";
import { Hero } from "./_components/hero";
import { Features } from "./_components/features";
import { HowItWorks } from "./_components/how-it-works";
import { Testimonials } from "./_components/testimonials";
import { MoreDownloaders } from "./_components/more-downloaders";
import { FrequentlyAsked } from "./_components/frequently-asked";

export default function HomePage() {
  return (
    <div>
      {/* Ticker Band */}
      <MarqueeBand />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <Testimonials />

      {/* More Downloaders Section */}
      <MoreDownloaders />

      {/* FAQ Section */}
      <FrequentlyAsked />
    </div>
  );
}
