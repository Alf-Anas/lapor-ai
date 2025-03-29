-- CreateTable
CREATE TABLE "laporan" (
    "id" SERIAL NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "photo" TEXT,
    "valid" BOOLEAN NOT NULL DEFAULT false,
    "tanggapan" TEXT,
    "instansi" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "user_id" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laporan_pkey" PRIMARY KEY ("id")
);
