import { content } from '../content'
import { assetUrl } from '../assetUrl'

export default function FinalCTA() {
  const { finalCta } = content
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-cream sm:py-32"
      style={{
        backgroundImage: `url('${assetUrl('/images/final-cta-background.jpg')}')`,
        backgroundPosition: 'center 78%',
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 bg-ink/74" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,27,22,0.55),rgba(31,27,22,0.92)),radial-gradient(circle_at_50%_15%,rgba(200,85,61,0.2),transparent_34%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight">
          {finalCta.title}
        </h2>
        <p className="mt-6 font-display text-2xl sm:text-3xl italic text-accent">
          {finalCta.sub}
        </p>
        <p className="mt-6 text-lg text-cream/75 leading-relaxed">
          {finalCta.body}
        </p>
      </div>
    </section>
  )
}
