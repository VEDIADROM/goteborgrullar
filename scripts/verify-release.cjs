const fs = require('fs')
const path = require('path')

const root = process.cwd()
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8')
const exists = (file) => fs.existsSync(path.join(root, file))

const checks = []
const failures = []

function check(name, condition, detail = '') {
  checks.push({ name, ok: Boolean(condition), detail })
  if (!condition) failures.push(`${name}${detail ? `: ${detail}` : ''}`)
}

const content = read('src/content.js')
const html = read('index.html')
const readme = read('README.md')
const favicon = read('public/favicon.svg')
const pkg = JSON.parse(read('package.json'))
const lock = JSON.parse(read('package-lock.json'))
const posts = JSON.parse(read('data/posts.json'))

check('package name is synced', pkg.name === 'goteborgrullar')
check('package-lock name is synced', lock.name === 'goteborgrullar')
check('site title uses #Göteborgrullar', html.includes('#Göteborgrullar – En stad som rullar tillsammans'))
check('Open Graph title uses #Göteborgrullar', html.includes('og:title') && html.includes('#Göteborgrullar – En stad som rullar tillsammans'))
check('Open Graph image is configured', html.includes('og:image') && html.includes('./images/og-image.jpg'))
check('Twitter title uses #Göteborgrullar', html.includes('twitter:title') && html.includes('content="#Göteborgrullar"'))
check('favicon no longer uses old JR initials', !favicon.includes('JR') && favicon.includes('#G'))
check('content site name uses #Göteborgrullar', content.includes("siteName: '#Göteborgrullar'"))
check('banner explains initiative early', content.includes("'#Göteborgrullar är ett oberoende, organiskt initiativ från Göteborg."))
check('banner eyebrow includes #Göteborgrullar', content.includes("eyebrow: 'Bakgrunden · #Göteborgrullar'"))
check('hero note uses #Göteborgrullar as site name', content.includes("Initiativet heter #Göteborgrullar."))
check('footer disclaimer uses #Göteborgrullar', content.includes("'#Göteborgrullar är ett oberoende initiativ."))
check('README uses #Göteborgrullar heading', readme.startsWith('# #Göteborgrullar'))
check('README explains rebuild for posts', readme.includes('data/posts.json') && readme.includes('byggas och deployas igen'))
check('old site name copy removed', !content.includes('Initiativet heter Jag Rullar') && !content.includes('Jag Rullar är ett oberoende initiativ'))
check('old hashtag casing removed from source', !content.includes('#göteborgrullar') && !html.includes('#göteborgrullar') && !readme.includes('#göteborgrullar'))
check('participation phrase remains available', content.includes('Jag rullar för Volvo genom att'))
check('headline framing exists', content.includes('Exempel på rubriker som präglat våren 2026'))
check('final line exists', content.includes('Låt oss visa det.'))
check('footer mentions both Volvo entities', content.includes('Volvo Cars') && content.includes('AB Volvo'))
check('participation images have descriptive alt text', read('src/components/HowToParticipate.jsx').includes('Bildidé:'))
check('feed images have descriptive alt text', read('src/components/LiveFeed.jsx').includes('Bild från') && read('src/components/LiveFeed.jsx').includes('Profilbild för'))
check('asset helper is used for runtime images', read('src/components/LiveFeed.jsx').includes('assetUrl(') && read('src/components/ContextBanner.jsx').includes('assetUrl('))
check('feed curation flow is visible', content.includes('Flödet är handkuraterat') && content.includes('Tipsa om ett inlägg'))
check('official hashtag links exist', content.includes('linkedin.com/feed/hashtag') && content.includes('instagram.com/explore/tags'))
check('posts.json is an array', Array.isArray(posts), `type=${typeof posts}`)
check('posts.json contains sample posts', posts.length >= 4, `count=${posts.length}`)

const requiredAssets = [
  'public/images/participation-selfie.jpg',
  'public/images/participation-production.jpg',
  'public/images/participation-coding.jpg',
  'public/images/context-background.jpg',
  'public/images/final-cta-background.jpg',
  'public/images/og-image.jpg',
]

for (const asset of requiredAssets) {
  check(`asset exists: ${asset}`, exists(asset))
}

for (const [index, post] of posts.entries()) {
  check(`post ${index + 1} has platform`, Boolean(post.platform))
  check(`post ${index + 1} has author`, Boolean(post.author))
  check(`post ${index + 1} has text`, Boolean(post.text))
  check(`post ${index + 1} has url`, Boolean(post.url))
  check(`post ${index + 1} image exists`, Boolean(post.image) && exists(`public${post.image}`), post.image || 'missing image field')
  check(`post ${index + 1} avatar exists`, Boolean(post.avatar) && exists(`public${post.avatar}`), post.avatar || 'missing avatar field')
}

for (const result of checks) {
  console.log(`${result.ok ? 'OK' : 'FAIL'} ${result.name}${result.detail && !result.ok ? ` (${result.detail})` : ''}`)
}

if (failures.length) {
  console.error(`\nRelease verification failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(`\nRelease verification passed (${checks.length} checks).`)
