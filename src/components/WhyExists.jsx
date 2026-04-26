import { content } from '../content'

export default function WhyExists() {
  const { why } = content
  return (
    <section className="px-6 py-20 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
          {why.title}
        </h2>
        <div className="mt-8 space-y-5 text-lg sm:text-xl text-ink/85 leading-relaxed">
          {why.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  )
}
