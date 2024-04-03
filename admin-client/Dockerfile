# FROM node:lts-alpine

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3001
# CMD ["npm", "run", "dev"]
FROM node:18

RUN chmod +x /docker/entrypoint
ENTRYPOINT ["/entrypoint"]
