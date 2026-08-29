FROM dhi.io/bun:1-dev AS development

WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
bun install --frozen-lockfile

COPY . .

ENV WATCHPACK_POLLING=true
ENV HOSTNAME="0.0.0.0"

EXPOSE 3000

CMD ["bun", "run", "dev"]