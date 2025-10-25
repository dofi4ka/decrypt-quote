# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install Bun
RUN npm install -g bun

# Copy package files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

EXPOSE 3000

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]
