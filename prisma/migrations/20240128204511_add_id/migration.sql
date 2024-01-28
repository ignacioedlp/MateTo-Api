-- DropIndex
DROP INDEX "VerificacionToken_token_key";

-- AlterTable
ALTER TABLE "VerificacionToken" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "VerificacionToken_pkey" PRIMARY KEY ("id");
