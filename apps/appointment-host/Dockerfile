# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/appointment-host/package.json ./apps/appointment-host/
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/ui-mfe/package.json ./packages/ui-mfe/
COPY packages/appointment-mfe/package.json ./packages/appointment-mfe/
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

RUN npm ci --workspace appointment-host --include-workspace-root

COPY packages/sdk ./packages/sdk
COPY packages/ui-mfe ./packages/ui-mfe
COPY packages/appointment-mfe ./packages/appointment-mfe
COPY apps/appointment-host ./apps/appointment-host

ARG VITE_API_URL=/api
ARG VITE_USE_MOCKS=false
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCKS=$VITE_USE_MOCKS

RUN npm run build --workspace appointment-host

# Serve stage
FROM nginx:alpine
COPY apps/appointment-host/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/appointment-host/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
