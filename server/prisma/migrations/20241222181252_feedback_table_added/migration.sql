-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" SERIAL NOT NULL,
    "feed_gym" TEXT[],
    "feed_nutrion" TEXT[],
    "feed_mood" TEXT[],
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);
