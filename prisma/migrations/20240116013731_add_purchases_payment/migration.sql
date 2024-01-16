/*
  Warnings:

  - A unique constraint covering the columns `[purchaseId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `purchaseId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "purchaseId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paymentId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_purchaseId_key" ON "Payment"("purchaseId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
