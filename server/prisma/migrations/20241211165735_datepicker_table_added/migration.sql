/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Datepicker` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Datepicker_user_id_key" ON "Datepicker"("user_id");
