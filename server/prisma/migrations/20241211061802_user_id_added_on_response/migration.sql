/*
  Warnings:

  - You are about to drop the column `user_id` on the `AIResponse` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIResponse" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "user_id" TEXT NOT NULL;
