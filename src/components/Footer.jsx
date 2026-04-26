import { content } from '../content'

export default function Footer() {
  const { footer } = content
  return (
    <footer className="px-6 py-12 border-t border-line">
      <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted">
        <p className="max-w-prose">{footer.disclaimer}</p>
        <div className="space-y-1 sm:text-right">
          <p>{footer.note}</p>
          <p>
            <a className="hover:text-accent" href={`mailto:${footer.email}`}>
              {footer.email}
            </a>
            <span aria-hidden="true"> · </span>
            <a className="hover:text-accent" href={`tel:${footer.phone}`}>
              {footer.phone}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
