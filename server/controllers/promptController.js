import prisma from "../db.js";

import "dotenv/config";

export const promptGetById = async (req, res) => {
  const Data = await prisma.prompt.findFirst({
    where: {
      user_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
