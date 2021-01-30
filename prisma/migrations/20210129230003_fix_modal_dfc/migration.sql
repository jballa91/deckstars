/*
  Warnings:

  - The migration will change the primary key for the `ModalDFC` table. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "ModalDFC" DROP CONSTRAINT "ModalDFC_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "frontFaceId" DROP NOT NULL,
ALTER COLUMN "backFaceId" DROP NOT NULL,
ADD PRIMARY KEY ("id");

-- AlterIndex
ALTER INDEX "ModalDFC_backFaceId_unique" RENAME TO "ModalDFC.backFaceId_unique";

-- AlterIndex
ALTER INDEX "ModalDFC_frontFaceId_unique" RENAME TO "ModalDFC.frontFaceId_unique";
