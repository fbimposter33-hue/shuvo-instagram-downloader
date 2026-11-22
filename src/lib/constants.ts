export const homeSections = {
  hero: "hero",
  features: "features",
  howItWorks: "how-it-works",
  testimonials: "testimonials",
  moreDownloaders: "more-downloaders",
  frequentlyAsked: "faq",
} as const;

export const homeLinks = {
  hero: "#" + homeSections.hero,
  features: "#" + homeSections.features,
  howItWorks: "#" + homeSections.howItWorks,
  testimonials: "#" + homeSections.testimonials,
  moreDownloaders: "#" + homeSections.moreDownloaders,
  frequentlyAsked: "#" + homeSections.frequentlyAsked,
} as const;
