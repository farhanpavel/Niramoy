/*
  Warnings:

  - You are about to drop the column `status` on the `AIResponse` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `AIResponse` table. All the data in the column will be lost.
  - You are about to drop the `AiPrompt` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AIResponse" DROP CONSTRAINT "AIResponse_user_id_fkey";

-- DropIndex
DROP INDEX "AIResponse_user_id_key";

-- AlterTable
ALTER TABLE "AIResponse" DROP COLUMN "status",
DROP COLUMN "user_id";

-- DropTable
DROP TABLE "AiPrompt";
