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

function listFiles(dir, matcher = () => true) {
  const fullDir = path.join(root, dir)
  if (!fs.existsSync(fullDir)) return []

  return fs.readdirSync(fullDir, { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(relative, matcher)
    return matcher(relative) ? [relative] : []
  })
}

check('dist directory exists', exists('dist'))
check('Vite base is relative for GitHub Pages', read('vite.config.js').includes("base: './'"))
check('asset helper exists', exists('src/assetUrl.js'))
check('asset helper uses Vite base URL', read('src/assetUrl.js').includes('import.meta.env.BASE_URL'))

const componentFiles = listFiles('src/components', (file) => file.endsWith('.jsx'))
for (const file of componentFiles) {
  const source = read(file)
  const imageSrcExpressions = source.match(/src=\{[^}]*\}/g) || []
  const directImageSrc = imageSrcExpressions.filter((expression) => {
    return expression.includes('/images/') && !expression.includes('assetUrl(')
  })
  const unsafeBackground = source.match(/backgroundImage:\s*["'`]url\(["'`]\/images\//g) || []

  check(`${file} has no direct /images img src`, directImageSrc.length === 0, directImageSrc.join(', '))
  check(`${file} has no direct /images background`, unsafeBackground.length === 0, unsafeBackground.join(', '))
}

const html = exists('dist/index.html') ? read('dist/index.html') : ''
check('dist index exists', Boolean(html))
check('dist script path is relative', html.includes('type="module" crossorigin src="./assets/'))
check('dist favicon path is relative and cache-busted', html.includes('href="./favicon.svg?v=2"'))
check('dist OG image path is relative', html.includes('content="./images/og-image.jpg"'))
check('dist has no root-relative asset attributes', !/(src|href|content)="\/(assets|images|favicon)/.test(html))

const assetFiles = listFiles('dist/assets', (file) => file.endsWith('.js') || file.endsWith('.css'))
check('dist asset bundle exists', assetFiles.length > 0)

for (const file of assetFiles) {
  const bundle = read(file)
  const unsafeCssUrl = bundle.match(/url\(["']?\/images\//g) || []
  const unsafeHtmlSrc = bundle.match(/src:["']\/images\//g) || []

  check(`${file} has no root-relative CSS image urls`, unsafeCssUrl.length === 0, unsafeCssUrl.join(', '))
  check(`${file} has no root-relative rendered image props`, unsafeHtmlSrc.length === 0, unsafeHtmlSrc.join(', '))
}

const posts = JSON.parse(read('data/posts.json'))
for (const [index, post] of posts.entries()) {
  for (const key of ['image', 'avatar']) {
    if (!post[key]) continue
    const asset = post[key].replace(/^\/+/, '')
    check(`post ${index + 1} ${key} is under images/`, asset.startsWith('images/'), post[key])
    check(`post ${index + 1} ${key} exists in public`, exists(path.join('public', asset)), post[key])
  }
}

for (const result of checks) {
  console.log(`${result.ok ? 'OK' : 'FAIL'} ${result.name}${result.detail && !result.ok ? ` (${result.detail})` : ''}`)
}

if (failures.length) {
  console.error(`\nPages asset verification failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log(`\nPages asset verification passed (${checks.length} checks).`)
