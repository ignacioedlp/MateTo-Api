/*
  Warnings:

  - The values [MORADO,NEGRO,BLANCO,AZUL,AMARILLO,MARRON_OSCURO,MARRON_CLARO,GRIS,ROSA,TURQUEZA] on the enum `Color` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Color_new" AS ENUM ('PURPLE', 'BLACK', 'WHITE', 'BLUE', 'YELLOW', 'DARK_BROWN', 'LIGHT_BROWN', 'GRAY', 'PINK', 'TURQUOISE');
ALTER TABLE "Product" ALTER COLUMN "colors" TYPE "Color_new"[] USING ("colors"::text::"Color_new"[]);
ALTER TYPE "Color" RENAME TO "Color_old";
ALTER TYPE "Color_new" RENAME TO "Color";
DROP TYPE "Color_old";
COMMIT;
