import { content } from '../content'
import { assetUrl } from '../assetUrl'
import ShareActions from './ShareActions'

export default function HowToParticipate() {
  const { how } = content
  return (
    <section id="delta" className="px-6 py-20 sm:py-24 border-t border-line scroll-mt-8">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            {how.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{how.sub}</p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-3">
          {how.steps.map((step) => (
            <li
              key={step.n}
              className="rounded-lg bg-white p-7 shadow-sm border border-line/60"
            >
              <div className="font-display text-5xl text-accent leading-none">
                {step.n}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-muted leading-relaxed">{step.body}</p>
              {step.n === 1 && (
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-accent">
                    {how.photoExamplesLabel}
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {how.photoExamples.map((example) => (
                      <figure key={example.title}>
                        <img
                          src={assetUrl(example.image)}
                          alt={`Bildidé: ${example.title}`}
                          className="aspect-square w-full rounded-md object-cover"
                        />
                        <figcaption className="mt-2 truncate text-xs text-muted">
                          {example.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>

        <ShareActions />
      </div>
    </section>
  )
}
