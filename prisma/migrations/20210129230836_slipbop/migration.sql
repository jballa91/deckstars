/*
  Warnings:

  - Made the column `frontFaceId` on table `ModalDFC` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `backFaceId` on table `ModalDFC` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ModalDFC" ALTER COLUMN "frontFaceId" SET NOT NULL,
ALTER COLUMN "backFaceId" SET NOT NULL;
