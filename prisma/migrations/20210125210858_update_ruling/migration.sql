/*
  Warnings:

  - Added the required column `date` to the `Ruling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ruling" ADD COLUMN     "date" TEXT NOT NULL;
