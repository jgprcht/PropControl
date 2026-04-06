FROM node:22-alpine AS base

WORKDIR /app

# Install dependencies only when needed
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm install --omit=dev

# Build the app
FROM base AS builder

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]
