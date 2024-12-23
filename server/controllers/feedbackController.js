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

export const updateMood = async (req, res) => {
  const { mood, user_id } = req.body;
  const response = await prisma.response.findFirst({
    where: {
      user_id: user_id
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  const moodFound = await prisma.mood.findFirst({
    where: {
      responseId: response.id
    }
  });

  if(moodFound){
    const Data = await prisma.mood.update({
      where: {
        id: moodFound.id
      },
      data: {
        mood: mood
      },
    });
    res.status(200).json(Data);
  }else{
  const Data = await prisma.mood.create({
    data: {
      user_id: user_id,
      mood: mood,
      responseId: response.id
    },
  });  
  res.status(200).json(Data);
}
};

export const updateMealStatus = async (req, res) => {
  const { completed, id} = req.body;
  const Data = await prisma.meal.update({
    where: {
      id: id
    },
    data: {
      completed: completed,
    },
  });
  res.status(200).json(Data);
};

export const updateWorkoutStatus = async (req, res) => {
  const { completed, id } = req.body;
  const Data = await prisma.exercise.update({
    where: {
      id: id
    },
    data: {
      completed: completed,
    },
  });
  res.status(200).json(Data);
};
