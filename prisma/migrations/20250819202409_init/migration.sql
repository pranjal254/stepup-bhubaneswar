-- CreateEnum
CREATE TYPE "public"."Experience" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('UPI', 'CASH', 'BANK_TRANSFER');

-- CreateTable
CREATE TABLE "public"."registrations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "experience" "public"."Experience" NOT NULL DEFAULT 'BEGINNER',
    "songs" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "transactionId" TEXT,
    "paymentMethod" "public"."PaymentMethod",
    "workshop" TEXT NOT NULL DEFAULT 'anvi-shetty-sept-2024',
    "notes" TEXT,
    "paidAt" TIMESTAMP(3),
    "registeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registrations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registrations_email_key" ON "public"."registrations"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registrations_phone_key" ON "public"."registrations"("phone");
