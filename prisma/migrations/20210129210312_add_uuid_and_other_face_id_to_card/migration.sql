/*
  Warnings:

  - Added the required column `uuid` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "uuid" TEXT NOT NULL,
ADD COLUMN     "otherFaceId" TEXT;
