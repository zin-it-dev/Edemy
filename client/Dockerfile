FROM dhi.io/bun:1-dev AS base

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
bun install --frozen-lockfile


FROM base AS development

COPY . .

ENV WATCHPACK_POLLING=true
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["bun", "run", "dev"]


FROM base AS builder

COPY . .

RUN bun run build


FROM dhi.io/bun:1 AS production

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["bun", "server.js"]
