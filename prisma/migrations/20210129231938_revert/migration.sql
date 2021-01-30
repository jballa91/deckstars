-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_otherFaceId_fkey";

-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "otherFaceId" DROP NOT NULL;
