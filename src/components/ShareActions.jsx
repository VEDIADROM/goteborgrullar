import { useState } from 'react'
import { content } from '../content'

export default function ShareActions() {
  const { share } = content
  const [state, setState] = useState('idle') // 'idle' | 'copied' | 'shared'

  async function handleClick() {
    let copied = false
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(share.template)
        copied = true
      }
    } catch {
      // ignore – kommer att hanteras av fallback nedan
    }

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: share.shareTitle,
          text: share.template,
        })
        setState('shared')
      } catch {
        setState(copied ? 'copied' : 'idle')
      }
    } else {
      setState(copied ? 'copied' : 'idle')
    }

    setTimeout(() => setState('idle'), 2500)
  }

  const label =
    state === 'copied'
      ? share.copiedLabel
      : state === 'shared'
        ? share.sharedLabel
        : share.idleLabel

  return (
    <div className="mt-10 rounded-lg border border-line/70 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">{share.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{share.help}</p>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-medium text-cream transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-cream"
        >
          {label}
          <span aria-hidden="true" className="ml-2">
            {state === 'idle' ? '↗' : '✓'}
          </span>
        </button>
      </div>
      <pre className="mt-5 whitespace-pre-wrap rounded-lg border border-line bg-cream p-4 font-sans text-base leading-relaxed text-ink/90">
        {share.template}
      </pre>
    </div>
  )
}
