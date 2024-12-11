/*
  Warnings:

  - You are about to drop the column `status` on the `AIResponse` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AIResponse" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
