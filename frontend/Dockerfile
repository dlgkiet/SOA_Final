# -------------------------------
# 🧱 STAGE 1: Build frontend
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# -------------------------------
# 🚀 STAGE 2: Serve with nginx
FROM nginx:stable-alpine

# Copy build output to nginx's html directory
COPY --from=build /app/dist /usr/share/nginx/html

# 🛠 Copy custom nginx config that uses $PORT
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template

# 🧩 Render will auto-inject $PORT, and nginx's entrypoint will auto-use the template
# No need to manually expose or run nginx here

# OPTIONAL: You can keep EXPOSE for clarity, but it's not strictly needed
EXPOSE 80
