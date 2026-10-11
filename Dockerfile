# dependences
FROM oven/bun:1.4.1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile 

# build
FROM oven/bun:1.4.1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

#production-dependences
FROM oven/bun:1.4.1 AS pro-deps
WORKDIR /app 
COPY package.json bun.lock  ./
RUN bun  install --frozen-lockfile --production

# runner
FROM oven/bun:1.4.1-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pro-deps --chown=bun:bun /app/node_modules ./node_modules
COPY --from=builder --chown=bun:bun /app/dist ./dist
COPY --chown=bun:bun package.json ./


USER bun
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
    CMD bun -e "fetch('http://127.0.0.1:5000/api/health').then(r=>process.exit(r.ok ? 0 :1)).catch(()=>process.exit(1))" 

CMD [ "bun" , "run" ,"dist/main.js" ]
