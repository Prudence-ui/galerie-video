/*
  Warnings:

  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[accessKey]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessKey` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiresAt` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_pkey",
ADD COLUMN     "accessKey" TEXT NOT NULL,
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "status" DROP DEFAULT,
ADD CONSTRAINT "Payment_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Payment_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_accessKey_key" ON "Payment"("accessKey");
