import { content } from '../content'

export default function BiggerPicture() {
  const { bigger } = content
  return (
    <section className="px-6 py-24 sm:py-32 border-t border-line">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
          {bigger.title}
        </h2>
        <p className="mt-8 text-xl sm:text-2xl text-ink/85 leading-relaxed">
          {bigger.body}
        </p>
      </div>
    </section>
  )
}
