/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[symbol]` on the table `CardSymbol`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CardSymbol.symbol_unique" ON "CardSymbol"("symbol");
