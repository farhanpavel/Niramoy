/*
  Warnings:

  - You are about to drop the column `status` on the `Response` table. All the data in the column will be lost.
  - Added the required column `status` to the `AIResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIResponse" ADD COLUMN     "status" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "status";
