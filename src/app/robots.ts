import { ENV_DOMAIN } from "@/config-global.env";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${ENV_DOMAIN}/sitemap.xml`,
  }
}
