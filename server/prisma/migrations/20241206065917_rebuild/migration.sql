/*
  Warnings:

  - You are about to drop the `Form` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Hall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_student_id_fkey";

-- DropForeignKey
ALTER TABLE "Provost" DROP CONSTRAINT "Provost_provost_id_fkey";

-- DropTable
DROP TABLE "Form";

-- DropTable
DROP TABLE "Hall";

-- DropTable
DROP TABLE "Notice";

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Provost";

-- DropTable
DROP TABLE "Room";
