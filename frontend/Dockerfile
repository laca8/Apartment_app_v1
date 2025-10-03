FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy rest of the app
COPY . .

# 6. Build the app
RUN npm run build

# 7. Production image
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
