import prisma from "../db.js";
import bcrypt from "bcrypt";
export const userGet = async (req, res) => {
  const Data = await prisma.user.findMany({});
  res.status(200).json(Data);
};
export const userGetById = async (req, res) => {
  const Data = await prisma.user.findUnique({
    where: {
      user_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
export const userGetByName = async (req, res) => {
  const Data = await prisma.user.findMany({
    where: {
      role: req.params.role,
    },
  });
  res.status(200).json(Data);
};
export const userPost = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    if (role === "patient") {
      const Data = await prisma.user.create({
        data: {
          email,
          role,
          name,
          password: hashedPassword,
        },
      });

      res.status(200).json(Data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
export const userCheckPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Data = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (Data && (await bcrypt.compare(password, Data.password))) {
      res.status(200);
    } else {
      res.status(401).json("invalid Data");
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const userDelete = async (req, res) => {
  const Data = await prisma.user.delete({
    where: {
      user_id: req.params.id,
    },
  });
  res.status(200).json(Data);
};
export const userPut = async (req, res) => {
  const { name, email } = req.body;
  const Data = await prisma.user.update({
    where: {
      user_id: req.params.id,
    },
    data: {
      name,
      email,
    },
  });
  res.status(200).json(Data);
};
