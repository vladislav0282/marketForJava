# FROM node:18-alpine AS stage1
# WORKDIR /market
# COPY package.json ./
# RUN npm install

# FROM node:18-alpine AS stage2
# WORKDIR /market
# COPY . .
# COPY --from=stage /market/node_modules ./node_modules
# RUN npm run build

# FROM node:18-alpine AS final
# WORKDIR /market
# ENV NODE_ENV production
# COPY --from=stage2 /market ./

# EXPOSE 5173
# CMD [ "npm", "run dev" ]

# FROM node:18-alpine AS builder
# WORKDIR /market
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# # Stage 2: Serve
# FROM nginx:alpine
# COPY --from=builder /market/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# FROM node:18-alpine AS developers
# WORKDIR /market
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 5173
# CMD ["npm", "run", "dev"]





FROM node:22-alpine AS stage
WORKDIR /market
COPY . .
RUN npm install

FROM node:22-alpine AS production
WORKDIR /market
COPY . .
COPY --from=stage /market/node_modules ./node_modules
RUN npm run build
