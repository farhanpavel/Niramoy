import prisma from "../db.js";

export const blogGet = async (req, res) => {
  try {
    const Data = await prisma.blog.findMany({});
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Blog");
  }
};

export const blogPost = async (req, res) => {
  const { title, description, userId } = req.body;
  try {
    const Data = await prisma.blog.create({
      data: {
        title,
        description,
        userId,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Blog");
  }
};
export const blogDelete = async (req, res) => {
  try {
    const Data = await prisma.blog.delete({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json(Data);
  } catch (err) {
    res.status(500).json("Erorr On fetching Blog");
  }
};
