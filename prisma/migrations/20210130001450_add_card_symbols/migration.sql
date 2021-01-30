-- CreateTable
CREATE TABLE "CardSymbol" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "svg_uri" TEXT NOT NULL,
    "english" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
