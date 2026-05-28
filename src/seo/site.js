export const SITE_URL = 'https://www.theharnessnepal.com'
export const SITE_NAME = 'Harness Zipline & Adventure Resort'
export const BUSINESS_NAME = 'Harness Zipline Pvt Ltd'
export const DEFAULT_TITLE = 'Harness Nepal Zipline Resort & Adventure Stay in Kusma'
export const DEFAULT_DESCRIPTION =
  'Stay, dine, and adventure in Kusma, Nepal at Harness Zipline & Adventure Resort. Book scenic rooms, zipline experiences, events, and nature-filled getaways.'
export const DEFAULT_IMAGE = '/images/logo.jpg'

export const CONTACT = {
  email: 'theharnessnepal@gmail.com',
  phoneDisplay: '067-422112',
  phoneHref: 'tel:+97767422112',
  address: 'Harness Zipline Pvt Ltd, Kusma, Nepal, 33400',
}

export const SOCIAL_LINKS = [
  'https://facebook.com/harnesszipline',
  'https://instagram.com/harnesszipline',
  'https://twitter.com/harnesszipline',
]

export const absoluteUrl = (path = '/') => {
  if (!path) return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

export const absoluteImageUrl = (image = DEFAULT_IMAGE) => absoluteUrl(image)

export const buildLocalBusinessSchema = ({
  name = BUSINESS_NAME,
  url = SITE_URL,
  image = absoluteImageUrl(DEFAULT_IMAGE),
} = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Resort',
  name,
  url,
  image,
  email: CONTACT.email,
  telephone: CONTACT.phoneDisplay,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Kusma',
    addressLocality: 'Kusma',
    addressCountry: 'NP',
    postalCode: '33400',
  },
  areaServed: 'Nepal',
  sameAs: SOCIAL_LINKS,
})

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: BUSINESS_NAME,
  url: SITE_URL,
  email: CONTACT.email,
  telephone: CONTACT.phoneDisplay,
  sameAs: SOCIAL_LINKS,
})
