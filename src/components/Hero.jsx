import { content } from '../content'

export default function Hero() {
  const { hero } = content
  return (
    <section className="px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36">
      <div className="mx-auto max-w-4xl">
        <p className="text-xs sm:text-sm font-medium tracking-[0.18em] text-accent uppercase">
          {hero.eyebrow}
        </p>
        <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
          {hero.headline}
        </h1>
        <p className="mt-7 max-w-2xl text-lg sm:text-xl text-muted leading-relaxed">
          {hero.sub}
        </p>
        <div className="mt-10">
          <a
            href="#delta"
            className="inline-flex items-center rounded-full bg-ink px-7 py-3.5 text-base font-medium text-cream transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-cream"
          >
            {hero.cta}
            <span aria-hidden="true" className="ml-2">→</span>
          </a>
          <p className="mt-4 text-sm text-muted">{hero.hashtagNote}</p>
        </div>
      </div>
    </section>
  )
}
