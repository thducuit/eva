FROM node:21-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm i --force; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY . .


# Ensure .next/cache directory exists and has the correct permissions
RUN mkdir -p /app/.next/cache/images && chmod -R 755 /app/.next/cache

# Environment variables must be present at build time
ARG NEXT_PUBLIC_CMS
ENV NEXT_PUBLIC_CMS=${NEXT_PUBLIC_CMS}
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}
ARG NEXT_PUBLIC_API_CF7
ENV NEXT_PUBLIC_API_CF7=${NEXT_PUBLIC_API_CF7}
ARG NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
ARG AUTH_URL
ENV AUTH_URL=${AUTH_URL}
ARG AUTH_REDIRECT_PROXY_URL
ENV AUTH_REDIRECT_PROXY_URL=${AUTH_REDIRECT_PROXY_URL}




# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else yarn build; \
  fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN mkdir -p /app/.next/cache
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/cache ./.next/cache
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --chown=nextjs:nodejs --from=builder /app/ ./

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_CMS
ENV NEXT_PUBLIC_CMS=${NEXT_PUBLIC_CMS}
ARG NEXT_PUBLIC_API
ENV NEXT_PUBLIC_API=${NEXT_PUBLIC_API}
ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ARG AUTH_SECRET
ENV AUTH_SECRET=${AUTH_SECRET}
ARG NEXT_PUBLIC_API_CF7
ENV NEXT_PUBLIC_API_CF7=${NEXT_PUBLIC_API_CF7}
ARG NEXT_PUBLIC_DOMAIN
ENV NEXT_PUBLIC_DOMAIN=${NEXT_PUBLIC_DOMAIN}
ARG AUTH_TRUST_HOST
ENV AUTH_TRUST_HOST=${AUTH_TRUST_HOST}
ARG AUTH_URL
ENV AUTH_URL=${AUTH_URL}
ARG AUTH_REDIRECT_PROXY_URL
ENV AUTH_REDIRECT_PROXY_URL=${AUTH_REDIRECT_PROXY_URL}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]
