# Module Federation remote for @ank-cora/ui-mfe
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY packages/ui-mfe/package.json ./packages/ui-mfe/
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/appointment-mfe/package.json ./packages/appointment-mfe/
COPY apps/appointment-host/package.json ./apps/appointment-host/

RUN npm ci --workspace @ank-cora/ui-mfe --include-workspace-root

COPY packages/ui-mfe ./packages/ui-mfe

RUN npm run build:federation --workspace @ank-cora/ui-mfe

FROM nginx:alpine
COPY packages/ui-mfe/nginx.federation.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/packages/ui-mfe/dist-federation /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
