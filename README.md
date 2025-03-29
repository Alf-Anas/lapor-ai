# Lapor by AI

Lapor by AI adalah aplikasi berbasis kecerdasan buatan yang memungkinkan pengguna untuk melaporkan berbagai isu atau masalah di Indonesia. AI akan secara otomatis menganalisis laporan dan meneruskannya ke instansi terkait, serta memberikan tanggapan awal berdasarkan data yang tersedia.

## 🚀 Fitur Utama

-   **Pelaporan Otomatis**: User dapat membuat laporan dengan mudah.
-   **Analisis AI**: AI memvalidasi laporan dan meminta tambahan informasi jika diperlukan.
-   **Penerusan ke Instansi**: Laporan yang valid diteruskan ke instansi yang relevan.
-   **Notifikasi Status**: User dapat melihat status laporan mereka.
-   **Manajemen Laporan**: Admin dapat memantau dan mengelola laporan dengan Prisma.

## 🛠️ Teknologi yang Digunakan

-   **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
-   **Backend**: API Routes di Next.js
-   **Database**: PostgreSQL dengan [Prisma ORM](https://www.prisma.io/)
-   **Autentikasi**: Menggunakan JWT atau NextAuth.js
-   **Storage**: Untuk upload gambar laporan (opsional)
-   **Deployment**: Vercel atau server pribadi

## 📦 Instalasi dan Menjalankan Proyek

### 1. Clone Repository

```sh
git clone
```

### 2. Instal Dependensi

```sh
npm install
```

### 3. Konfigurasi Database dengan Prisma

1. **Buat file .env** dan tambahkan konfigurasi database:

```env
NODE_ENV=test
HOST_URL=http://localhost:3000
NEXT_PUBLIC_STAGE=LOCAL


# FOR KEYCLOAK SSO
NEXTAUTH_URL_IAM=https://localhost:9000/
NEXTAUTH_REALM_IAM=XXXX
NEXTAUTH_CLIENT_ID=XXXX
NEXTAUTH_CLIENT_SECRET=XXXX
NEXTAUTH_SECRET=XXXXX
NEXTAUTH_REDIRECT_URI=${HOST_URL}
NEXTAUTH_URL=${HOST_URL}

# DB
POSTGRESQL_HOST=localhost
POSTGRESQL_PORT=5432
POSTGRESQL_USERNAME=postgres
POSTGRESQL_PASSWORD=postgres
POSTGRESQL_DATABASE=postgres
POSTGRESQL_SCHEMA=public
DATABASE_URL=postgresql://${POSTGRESQL_USERNAME}:${POSTGRESQL_PASSWORD}@${POSTGRESQL_HOST}:${POSTGRESQL_PORT}/${POSTGRESQL_DATABASE}?schema=${POSTGRESQL_SCHEMA}

# Gemini AI
GOOGLE_GEMINI_MODEL=gemini-1.5-flash
GOOGLE_GEMINI_API_KEY=XXXXX
```

2. **Generate Prisma Schema & Migrasi Database**

```sh
npx prisma generate
npx prisma migrate dev --name init
npx prisma migrate deploy
```

### 4. Menjalankan Aplikasi

```sh
npm run dev  # atau npm run dev
```

Aplikasi akan berjalan di `http://localhost:3000`

---

💡 Dibuat dengan ❤️ menggunakan Next.js & Prisma.
