# Gunakan base image Node.js versi 14 dengan Alpine Linux
FROM node:14-alpine

# Set working directory di dalam container
WORKDIR /app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin seluruh konten proyek ke dalam container
COPY . .

# Ekspos port yang akan digunakan oleh aplikasi (misalnya, port 3000)
EXPOSE 3000

# Jalankan perintah default saat container dimulai
CMD ["node", "app.js"]
