import prisma from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
export const feedbackGet = async (req, res) => {
  const Data = await prisma.feedback.findMany({});
  res.status(200).json(Data);
};

export const feedbackPost = async (req, res) => {
  const { feed_gym, feed_nutrion, feed_mood, user_id } = req.body;
  const Data = await prisma.feedback.create({
    data: {
      feed_gym,
      feed_nutrion,
      feed_mood,
      user_id,
    },
  });
  res.status(200).json(Data);
};
