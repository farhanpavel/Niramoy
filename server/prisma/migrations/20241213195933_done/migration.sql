/*
  Warnings:

  - You are about to drop the column `date` on the `Datepicker` table. All the data in the column will be lost.
  - Added the required column `dates` to the `Datepicker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Datepicker" DROP COLUMN "date",
ADD COLUMN     "dates" TEXT NOT NULL;
