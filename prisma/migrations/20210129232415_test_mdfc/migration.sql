-- AddForeignKey
ALTER TABLE "Card" ADD FOREIGN KEY ("otherFaceId") REFERENCES "Card"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
