/*
  Warnings:

  - Added the required column `user_id` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Meal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "user_id" TEXT NOT NULL;
