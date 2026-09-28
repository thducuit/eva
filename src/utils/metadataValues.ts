import { ENV_DOMAIN } from "@/config-global.env"
import { htmlDecode } from "@/lib/utils"

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function metadataValues(res: any) {
  if (!res) {
    return {
      metadataBase: new URL(ENV_DOMAIN!),
      title: 'AMA DESIGN & BUILD',
      description: 'AMA DESIGN & BUILD',
      alternates: {
        canonical: './',
      },
      author: 'Dev okhub',
    }
  }
  const result = res
  const meta = {
    metadataBase: new URL(ENV_DOMAIN!),
    title: htmlDecode(result?.title),
    description:
      result?.description === '' ? 'AMA DESIGN & BUILD' : htmlDecode(result?.description),
    alternates: {
      canonical: './',
    },
    author: 'Dev okhub',
    robots: 'follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large',
    lang: 'en',
    openGraph: {
      title: htmlDecode(result?.openGraph?.title) || htmlDecode(result?.title),
      description: htmlDecode(result?.openGraph?.description) || htmlDecode(result?.description),
      url: './',
      siteName: result?.openGraph?.siteName || 'AMA DESIGN & BUILD',
      images: Array.isArray(result?.openGraph?.image)
        ? [...result?.openGraph?.image]
        : result?.openGraph?.image?.url
          ? result?.openGraph?.image?.url
          : [],
      locale: result?.openGraph?.locale,
      type: result?.openGraph?.type,
    },
    twitter: {
      card: result?.twitter?.card || 'summary_large_image',
      title: htmlDecode(result?.twitter?.title) || htmlDecode(result?.title),
      description: htmlDecode(result?.twitter?.description) || htmlDecode(result?.description),
      creator: 'Dev okhub',
      images: Array.isArray(result?.og_image)
        ? [...result?.twitter?.image]
        : result?.twitter?.image
          ? result?.twitter?.image
          : [],
      misc: result?.twitter_misc,
    },
  }
  if (!result?.openGraph?.image?.url) {
    meta.openGraph.images.push({
      url: '/background-ava.jpg',
      width: 1200,
      height: 630,
      alt: htmlDecode(result?.title) || 'AMA DESIGN & BUILD',
    })
    meta.twitter.images.push({
      url: '/background-ava.jpg',
    })
  }

  return meta
}
