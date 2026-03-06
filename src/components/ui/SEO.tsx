import { Helmet } from 'react-helmet-async'

type Props = {
  title?: string
  description?: string
  image?: string
  url?: string
}

const SITE_NAME = 'Enrico Stangherlin'
const BASE_URL = 'https://stangherlin-enrico.github.io'
const DEFAULT_DESC =
  'Software developer — portfolio, blog, and projects by Enrico Stangherlin.'

export function SEO({ title, description = DEFAULT_DESC, image, url }: Props) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonical = url ? `${BASE_URL}${url}` : BASE_URL
  const ogImage = image ?? `${BASE_URL}/og-default.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  )
}
