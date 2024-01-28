/*
  Warnings:

  - Changed the type of `token` on the `VerificacionToken` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "VerificacionToken" DROP COLUMN "token",
ADD COLUMN     "token" BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "VerificacionToken_token_key" ON "VerificacionToken"("token");
