/*
  Warnings:

  - You are about to drop the `ModalDFC` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `otherFaceId` on table `Card` required. The migration will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "ModalDFC" DROP CONSTRAINT "ModalDFC_backFaceId_fkey";

-- DropForeignKey
ALTER TABLE "ModalDFC" DROP CONSTRAINT "ModalDFC_frontFaceId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "otherFaceId" SET NOT NULL;

-- DropTable
DROP TABLE "ModalDFC";

-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("otherFaceId") REFERENCES "Card"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
