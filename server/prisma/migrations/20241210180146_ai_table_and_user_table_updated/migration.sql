/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `AIResponse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `AIResponse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIResponse" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AIResponse_user_id_key" ON "AIResponse"("user_id");

-- AddForeignKey
ALTER TABLE "AIResponse" ADD CONSTRAINT "AIResponse_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
