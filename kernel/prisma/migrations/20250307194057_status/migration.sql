/*
  Warnings:

  - The `type` column on the `Deb` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `currency` column on the `Deb` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('RUB', 'USD', 'EUR', 'GBR');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('DEBIT', 'CREDIT');

-- CreateEnum
CREATE TYPE "STATUS" AS ENUM ('CLOSED', 'PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "Deb" ADD COLUMN     "status" "STATUS" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "type",
ADD COLUMN     "type" "Type" NOT NULL DEFAULT 'DEBIT',
DROP COLUMN "currency",
ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'RUB';
