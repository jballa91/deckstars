-- CreateEnum
CREATE TYPE "Strategy" AS ENUM ('AGGRO', 'CONTROL', 'COMBO', 'MIDRANGE');

-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "deckStrat" "Strategy";
