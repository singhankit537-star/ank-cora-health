FROM node:22-alpine
WORKDIR /app

COPY package.json package-lock.json ./
COPY backend/package.json ./backend/
COPY frontend/package.json ./frontend/
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/ui-mfe/package.json ./packages/ui-mfe/
COPY packages/appointment-mfe/package.json ./packages/appointment-mfe/
COPY apps/appointment-host/package.json ./apps/appointment-host/

RUN npm ci --workspace backend --include-workspace-root --omit=dev

COPY backend ./backend

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

CMD ["npm", "run", "start", "--workspace", "backend"]
