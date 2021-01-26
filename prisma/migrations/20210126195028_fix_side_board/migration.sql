/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[deckId]` on the table `SideBoard`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SideBoard_deckId_unique" ON "SideBoard"("deckId");
