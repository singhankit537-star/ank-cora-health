# Build stage
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
COPY frontend/package.json ./frontend/
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/ui-mfe/package.json ./packages/ui-mfe/
COPY packages/appointment-mfe/package.json ./packages/appointment-mfe/
COPY packages/pay-bill-mfe/package.json ./packages/pay-bill-mfe/
COPY apps/pay-bill-host/package.json ./apps/pay-bill-host/
COPY apps/appointment-host/package.json ./apps/appointment-host/
COPY backend/package.json ./backend/

RUN npm ci --workspace cora-health-app --include-workspace-root

COPY packages/sdk ./packages/sdk
COPY packages/ui-mfe ./packages/ui-mfe
COPY packages/appointment-mfe ./packages/appointment-mfe
COPY packages/pay-bill-mfe ./packages/pay-bill-mfe
COPY frontend ./frontend

ARG VITE_API_URL=/api
ARG VITE_USE_MOCKS=false
ARG VITE_APPOINTMENT_URL=
ARG VITE_PAY_BILL_URL=
ARG VITE_UI_MFE_REMOTE=
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_USE_MOCKS=$VITE_USE_MOCKS
ENV VITE_APPOINTMENT_URL=$VITE_APPOINTMENT_URL
ENV VITE_PAY_BILL_URL=$VITE_PAY_BILL_URL
ENV VITE_UI_MFE_REMOTE=$VITE_UI_MFE_REMOTE

RUN npm run build --workspace cora-health-app

# Serve stage
FROM nginx:alpine
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
