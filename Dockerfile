FROM node:22-alpine AS base

WORKDIR /app

COPY package*.json ./

FROM base AS deps
RUN npm install

FROM deps AS dev
COPY . .
EXPOSE 3000

FROM deps AS build
COPY . .
RUN npm run build

FROM node:22-alpine AS prod
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]