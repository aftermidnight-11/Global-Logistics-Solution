import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown>;
};

const SITE = 'Global Logistics Solutions';

export function PageMeta({ title, description, path = '', jsonLd }: Props) {
  const url = typeof window !== 'undefined' ? `${window.location.origin}${path}` : path;
  return (
    <Helmet>
      <title>{`${title} | ${SITE}`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={`${title} | ${SITE}`} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Global Logistics Solutions',
  url: 'https://www.global-logisticssolution.com',
  logo: 'https://www.global-logisticssolution.com/images/gls_logo_globe.png',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'info@global-logisticssolution.com',
  },
};
