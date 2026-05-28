import React from 'react'
import { Helmet } from 'react-helmet-async'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  absoluteImageUrl,
  absoluteUrl,
} from '../seo/site'

const Seo = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = DEFAULT_IMAGE,
  keywords,
  type = 'website',
  schema = [],
}) => {
  const canonical = absoluteUrl(path)
  const shareImage = absoluteImageUrl(image)
  const allSchema = Array.isArray(schema) ? schema : [schema]

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en-np" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={shareImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />
      {allSchema.filter(Boolean).map((entry, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  )
}

export default Seo
