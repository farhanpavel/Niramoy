/*
  Warnings:

  - Added the required column `response_id` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AIResponse" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "DietPlan" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "response_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Response" (
    "id" SERIAL NOT NULL,
    "ai_response_id" INTEGER NOT NULL,
    "diet_plan_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_ai_response_id_fkey" FOREIGN KEY ("ai_response_id") REFERENCES "AIResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_diet_plan_id_fkey" FOREIGN KEY ("diet_plan_id") REFERENCES "DietPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_response_id_fkey" FOREIGN KEY ("response_id") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
