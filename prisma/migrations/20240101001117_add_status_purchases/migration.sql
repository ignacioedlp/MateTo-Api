-- CreateEnum
CREATE TYPE "StatusPurchase" AS ENUM ('PENDING', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "status" "StatusPurchase" NOT NULL DEFAULT 'PENDING';
