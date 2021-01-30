/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[uuid]` on the table `Card`. If there are existing duplicate values, the migration will fail.
  - The migration will add a unique constraint covering the columns `[otherFaceId]` on the table `Card`. If there are existing duplicate values, the migration will fail.

*/
-- CreateTable
CREATE TABLE "ModalDFC" (
    "frontFaceId" TEXT NOT NULL,
    "backFaceId" TEXT NOT NULL,

    PRIMARY KEY ("frontFaceId","backFaceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "ModalDFC_frontFaceId_unique" ON "ModalDFC"("frontFaceId");

-- CreateIndex
CREATE UNIQUE INDEX "ModalDFC_backFaceId_unique" ON "ModalDFC"("backFaceId");

-- CreateIndex
CREATE UNIQUE INDEX "Card.uuid_unique" ON "Card"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Card.otherFaceId_unique" ON "Card"("otherFaceId");

-- AddForeignKey
ALTER TABLE "ModalDFC" ADD FOREIGN KEY ("frontFaceId") REFERENCES "Card"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModalDFC" ADD FOREIGN KEY ("backFaceId") REFERENCES "Card"("otherFaceId") ON DELETE CASCADE ON UPDATE CASCADE;
