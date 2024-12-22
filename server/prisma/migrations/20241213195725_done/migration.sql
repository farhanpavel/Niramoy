-- DropIndex
DROP INDEX "Datepicker_user_id_key";

-- AlterTable
ALTER TABLE "Datepicker" ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "user_id" SET DATA TYPE TEXT;
