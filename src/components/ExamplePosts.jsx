import { content } from '../content'

export default function ExamplePosts() {
  const { examples } = content
  return (
    <section className="px-6 py-20 sm:py-24 border-t border-line">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            {examples.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{examples.sub}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {examples.items.map((item, i) => (
            <li
              key={i}
              className="rounded-lg bg-white p-7 border border-line/60 shadow-sm"
            >
              <div className="text-xs uppercase tracking-[0.14em] text-accent">
                {item.role}
              </div>
              <p className="mt-4 font-display text-xl sm:text-2xl leading-snug text-ink/90">
                &ldquo;{item.text}&rdquo;
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
