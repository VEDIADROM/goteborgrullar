import { content } from '../content'
import curatedPosts from '../../data/posts.json'
import { assetUrl } from '../assetUrl'
import PlatformIcon from './PlatformIcon'

const platformLabels = {
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  x: 'X',
  twitter: 'X',
}

export default function LiveFeed() {
  const { feed, meta } = content
  const posts = Array.isArray(curatedPosts) ? curatedPosts : []

  return (
    <section className="px-6 py-20 sm:py-24 border-t border-line bg-white/40">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight">
            {feed.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{feed.sub}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {feed.curationNote}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={feed.submitUrl}
              className="inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-cream"
            >
              {feed.submitLabel}
            </a>
            {feed.hashtagLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-cream"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {posts.length === 0 && (
          <p className="mt-12 text-muted">
            Inga inlägg ännu. Bli först – posta med {meta.hashtag}.
          </p>
        )}

        {posts.length > 0 && (
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <li key={i}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full overflow-hidden rounded-lg bg-white border border-line/60 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-line">
                    <img
                      src={assetUrl(post.image || '/images/feed-placeholder.jpg')}
                      alt={post.role ? `Bild från ${post.role}` : 'Kuraterad inläggsbild'}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                      <PlatformIcon platform={post.platform} />
                      {platformLabels[post.platform] || post.platform}
                    </span>
                    <p className="mt-4 text-base leading-relaxed text-ink/90">
                      {post.text}
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <img
                        src={assetUrl(post.avatar || '/images/avatar-placeholder.jpg')}
                        alt={post.author ? `Profilbild för ${post.author}` : 'Profilbild'}
                        className="h-11 w-11 rounded-full border border-line object-cover"
                      />
                      <div>
                        {post.author && (
                          <p className="text-sm font-medium">{post.author}</p>
                        )}
                        {post.role && (
                          <p className="text-xs text-muted">{post.role}</p>
                        )}
                      </div>
                    </div>
                    <span className="mt-4 inline-block text-sm font-medium text-accent">
                      Visa originalinlägget
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
