import prisma from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

export const dateGet = async (req, res) => {
  const Data = await prisma.datepicker.findFirst({
    where: {
      user_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};

export const datePut = async (req, res) => {
  const Data = await prisma.datepicker.update({
    where: {
      user_id: req.params.id,
    },
    data: {
      date: req.body.date,
    },
  });
  res.status(200).json(Data);
};
export const datePost = async (req, res) => {
  const { date, user_id } = req.body;
  const Data = await prisma.datepicker.create({
    data: {
      date,
      user_id,
    },
  });
  res.status(200).json(Data);
};
