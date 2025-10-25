FROM node:22-alpine

WORKDIR /app

RUN npm install -g bun

COPY package.json bun.lock* ./

RUN bun install

COPY . .

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "preview", "--host", "0.0.0.0", "--port", "3000"]
