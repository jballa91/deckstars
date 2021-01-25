/*
  Warnings:

  - You are about to drop the column `setCode` on the `Set` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `Set` table. All the data in the column will be lost.
  - Added the required column `code` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFoilOnly` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isOnlineOnly` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `releaseDate` to the `Set` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Set` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Set" DROP COLUMN "setCode",
DROP COLUMN "cardId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "isFoilOnly" BOOLEAN NOT NULL,
ADD COLUMN     "isOnlineOnly" BOOLEAN NOT NULL,
ADD COLUMN     "releaseDate" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
