-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "VerificacionToken" (
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaExpiracion" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VerificacionToken_email_key" ON "VerificacionToken"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificacionToken_token_key" ON "VerificacionToken"("token");
