FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY landing ./landing
COPY scripts ./scripts
COPY src ./src
COPY public ./public
COPY server.mjs ./server.mjs
RUN npm run build

FROM node:22-alpine
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4173
WORKDIR /app
COPY --from=build /app/public ./public
COPY --from=build /app/server.mjs ./server.mjs
EXPOSE 4173
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e "fetch('http://127.0.0.1:4173/health').then(r=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"
CMD ["node", "server.mjs"]
