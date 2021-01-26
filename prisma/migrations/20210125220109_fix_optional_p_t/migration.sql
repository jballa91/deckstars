/*
  Warnings:

  - You are about to drop the column `typeId` on the `Card` table. All the data in the column will be lost.
  - Added the required column `type` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_typeId_fkey";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "typeId",
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "toughness" DROP NOT NULL,
ALTER COLUMN "power" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_CardToCardType" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CardToCardType_AB_unique" ON "_CardToCardType"("A", "B");

-- CreateIndex
CREATE INDEX "_CardToCardType_B_index" ON "_CardToCardType"("B");

-- AddForeignKey
ALTER TABLE "_CardToCardType" ADD FOREIGN KEY ("A") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardToCardType" ADD FOREIGN KEY ("B") REFERENCES "CardType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
