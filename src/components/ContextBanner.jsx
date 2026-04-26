import { content } from '../content'
import { assetUrl } from '../assetUrl'

export default function ContextBanner() {
  const { contextBanner } = content

  return (
    <section
      className="relative overflow-hidden bg-ink px-6 py-8 text-cream sm:py-10"
      style={{ backgroundImage: `url('${assetUrl('/images/context-background.jpg')}')` }}
    >
      <div className="absolute inset-0 bg-ink/86" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,85,61,0.22),transparent_32%),linear-gradient(90deg,rgba(31,27,22,0.92),rgba(31,27,22,0.72))]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {contextBanner.eyebrow}
            </p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {contextBanner.title}
            </h2>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-cream/72 sm:text-lg">
              {contextBanner.body}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-cream/60">
              {contextBanner.headlinesLabel}
            </p>
            <ul className="mt-3 grid gap-3 sm:grid-cols-3">
              {contextBanner.headlines.map((headline) => (
                <li
                  key={headline.title}
                  className="rounded-lg border border-cream/12 bg-cream/[0.06] p-4 shadow-sm"
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                    {headline.tag}
                  </p>
                  <p className="mt-3 text-lg font-black leading-tight text-cream lg:text-xl">
                    {headline.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
