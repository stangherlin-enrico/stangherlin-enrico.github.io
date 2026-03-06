import puppeteer from 'puppeteer-core'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { existsSync, copyFileSync, writeFileSync, readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── CLI flags ──────────────────────────────────────────────────────────────
//
//   npm run cv                        → colour + BW, with place/date and signature
//   npm run cv -- --no-bw            → colour only
//   npm run cv -- --no-place-date    → skip place and date field
//   npm run cv -- --no-signature     → skip signature even if image exists
//   npm run cv -- --help             → show this help
//
const args = process.argv.slice(2)

if (args.includes('--help')) {
  console.log(`
Usage: npm run cv [-- options]

Options:
  --no-bw           Skip the black & white version
  --no-place-date   Do not inject place and date into the CV
  --no-signature    Do not inject the signature image
  --help            Show this help
`)
  process.exit(0)
}

const withBW        = !args.includes('--no-bw')
const withPlaceDate = !args.includes('--no-place-date')
const withSignature = !args.includes('--no-signature')

console.log(`Options: BW=${withBW} | place-date=${withPlaceDate} | signature=${withSignature}`)

// ── Chrome detection ───────────────────────────────────────────────────────
const CHROME_PATHS = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
]

const chromePath = CHROME_PATHS.find(p => existsSync(p))
if (!chromePath) {
  console.error('Chrome/Edge not found. Install Chrome or update CHROME_PATHS.')
  process.exit(1)
}

// ── BW CSS ─────────────────────────────────────────────────────────────────
const BW_CSS = `
  /* ── Header banner: navy pieno → bianco con bordo inferiore ── */
  .eu-banner {
    background: #ffffff !important;
    border-bottom: 2px solid #111 !important;
    color: #111 !important;
  }
  .eu-label  { color: #555 !important; opacity: 1 !important; }
  .eu-name   { color: #111 !important; }
  .eu-role   { color: #333 !important; opacity: 1 !important; }

  /* ── EU logo: togli il rettangolo blu, stelle in grigio scuro ── */
  .eu-banner svg rect { fill: #ffffff !important; stroke: #ccc !important; stroke-width: 1 !important; }
  .eu-banner svg text { fill: #555 !important; }

  /* ── Contact strip: blu pieno → bianco con bordo inferiore ── */
  .contact-strip {
    background: #ffffff !important;
    border-bottom: 1px solid #ccc !important;
    color: #222 !important;
  }
  .ci { opacity: 1 !important; color: #222 !important; }

  /* ── Section label column: già chiara, ok — solo testo più scuro ── */
  .label-text { color: #222 !important; }

  /* ── Skill tags: blu chiaro → bianco con bordo ── */
  .stag      { background: #fff !important; color: #222 !important; border: 0.5px solid #aaa !important; }
  .stag.soft { background: #fff !important; color: #444 !important; border: 0.5px solid #ccc !important; }

  /* ── EQF badge: blu chiaro → bordo grigio ── */
  .eqf-badge { background: #f0f0f0 !important; color: #222 !important; }

  /* ── CEFR table: header navy → grigio chiaro con bordo ── */
  .cefr-table thead tr:first-child th {
    background: #e8e8e8 !important;
    color: #111 !important;
    border: 0.5px solid #aaa !important;
  }
  .cefr-table thead tr:last-child th {
    background: #f5f5f5 !important;
    color: #333 !important;
  }
  .cefr-table tbody td { color: #111 !important; }

  /* ── Testi accentuati (blu) → grigio scuro leggibile ── */
  .exp-period { color: #333 !important; }
  .exp-org    { color: #222 !important; }
  .exp-body ul li::before { color: #333 !important; }
  .lang-foreign-name { color: #111 !important; }
`

// ── Paths ──────────────────────────────────────────────────────────────────
const htmlPath      = resolve(__dirname, 'cv-template.html')
const htmlUrl       = `file:///${htmlPath.replace(/\\/g, '/')}`
const distDir       = resolve(__dirname, '..', 'dist')
const cvDir         = resolve(__dirname, '..', 'public', 'cv')
const signaturePath = resolve(__dirname, '..', 'private', 'signature.png')

// ── Signature / place-date data ────────────────────────────────────────────
const today = new Date()
const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
const placeDate = `Castello di Godego, ${dateStr}`

const signatureDataUri = withSignature && existsSync(signaturePath)
  ? `data:image/png;base64,${readFileSync(signaturePath).toString('base64')}`
  : null

if (withSignature) {
  if (signatureDataUri) console.log('  Signature image found — will be embedded.')
  else                  console.log('  No signature image at private/signature.png — field left blank.')
}

async function injectData(page) {
  if (!withPlaceDate && !signatureDataUri) return
  await page.evaluate((pd, injectPD, sigUri) => {
    if (injectPD) document.getElementById('sig-place-date').textContent = pd
    if (sigUri) {
      const img = document.createElement('img')
      img.src = sigUri
      document.getElementById('sig-signature').appendChild(img)
    }
  }, placeDate, withPlaceDate, signatureDataUri)
}

// ── PDF generation ─────────────────────────────────────────────────────────
const pdfOptions = {
  format: 'A4',
  printBackground: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
}

console.log('Launching browser...')
const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

// Colour version
const pageColor = await browser.newPage()
await pageColor.goto(htmlUrl, { waitUntil: 'networkidle0' })
await injectData(pageColor)
console.log('Generating colour PDF...')
await pageColor.pdf({ ...pdfOptions, path: resolve(distDir, 'Enrico_Stangherlin_CV.pdf') })
console.log('  ✓ Enrico_Stangherlin_CV.pdf')

// BW version (optional)
if (withBW) {
  const pageBW = await browser.newPage()
  await pageBW.goto(htmlUrl, { waitUntil: 'networkidle0' })
  await injectData(pageBW)
  await pageBW.addStyleTag({ content: BW_CSS })
  console.log('Generating B&W PDF...')
  await pageBW.pdf({ ...pdfOptions, path: resolve(distDir, 'Enrico_Stangherlin_CV_BW.pdf') })
  console.log('  ✓ Enrico_Stangherlin_CV_BW.pdf')
}

await browser.close()

// ── Copy to public/cv/ and update manifest ─────────────────────────────────
copyFileSync(
  resolve(distDir, 'Enrico_Stangherlin_CV.pdf'),
  resolve(cvDir, 'en-GB.pdf')
)
console.log('  ✓ public/cv/en-GB.pdf')

const manifest = [
  { label: '🇬🇧  English', file: '/cv/en-GB.pdf' },
]
writeFileSync(resolve(cvDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log('  ✓ public/cv/manifest.json')

console.log('Done.')
