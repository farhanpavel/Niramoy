-- DropForeignKey
ALTER TABLE "AIResponse" DROP CONSTRAINT "AIResponse_user_id_fkey";

-- DropIndex
DROP INDEX "AIResponse_user_id_key";
