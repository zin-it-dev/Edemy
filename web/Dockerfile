# Use the DHI Bun image as the base image
FROM dhi.io/bun:1-dev AS builder

# Set the working directory in the container
WORKDIR /app

COPY package.json bun.lock* ./

RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile


FROM builder AS development

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port on which the API will listen
EXPOSE 5173

# Run the server when the container launches
CMD ["bun", "run", "dev"]


FROM builder AS build-stage

# Copy the rest of the application source code into the container
COPY . .

# Build the React.js application (outputs to /app/dist)
RUN bun run build

FROM dhi.io/nginx:1.28.0-alpine3.21-dev AS production

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the static build output from the build stage to Nginx's default HTML serving directory
COPY --chown=nginx:nginx --from=build-stage /app/dist /usr/share/nginx/html

# Use a non-root user for security best practices
USER nginx

# Expose port 8080 to allow HTTP traffic
# Note: The default NGINX container now listens on port 8080 instead of 80
EXPOSE 8080

# Start Nginx directly with custom config
ENTRYPOINT ["nginx", "-c", "/etc/nginx/nginx.conf"]
CMD ["-g", "daemon off;"]