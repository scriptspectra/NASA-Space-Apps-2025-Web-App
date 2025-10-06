# Next.js Frontend Dockerfile - Multi-stage build
# Stage 1: Build stage with all dependencies
FROM node:20-bullseye AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package*.json ./
RUN npm ci

# Copy the frontend source code
COPY . .

# Generate Prisma client (now that schema is available)
RUN npx prisma generate

# Build Next.js application for production
RUN npm run build

# Stage 2: Production stage with minimal dependencies
FROM node:20-bullseye-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copy package files and install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --production

# Copy Prisma schema and generate client for production if it exists
COPY --from=builder /app/prisma ./prisma
RUN if [ -f prisma/schema.prisma ]; then npx prisma generate; fi

# Copy built application and configs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Expose port 3000 (this will be the only public entry point)
EXPOSE 3000

# Start Next.js production server
# Frontend server will use BACKEND_URL env var to reach backend internally
CMD ["sh","-c","npm start -- -H 0.0.0.0 -p ${PORT:-3000}"]
