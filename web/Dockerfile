# Use the DHI Bun image as the base image
FROM dhi.io/bun:1-dev

# Set the working directory in the container
WORKDIR /app

COPY package.json bun.lock* ./

RUN bun install --frozen-lockfile

# Copy the current directory contents into the container at /app
COPY . .

# Expose the port on which the API will listen
EXPOSE 5173

# Run the server when the container launches
CMD ["bun", "run", "dev"]
