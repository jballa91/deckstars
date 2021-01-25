/*
  Warnings:

  - You are about to drop the column `typeId` on the `SuperType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "SuperType" DROP CONSTRAINT "SuperType_typeId_fkey";

-- AlterTable
ALTER TABLE "SuperType" DROP COLUMN "typeId";
