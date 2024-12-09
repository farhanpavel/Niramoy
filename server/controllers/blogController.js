import prisma from "../db.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get All Blogs
export const blogGet = async (req, res) => {
  try {
    const blogs = await prisma.blog.findMany({});
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};
export const blogGetById = async (req, res) => {
  try {
    const blogs = await prisma.blog.findFirst({
      where: {
        blog_id: req.params.id,
      },
    });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Error fetching blogs" });
  }
};
// Create a Blog
export const blogPost = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("File:", req.file);

  const { title, description, userId } = req.body;
  const file = req.file;

  try {
    let imageUrl = "";
    if (file) {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        folder: "blog_images",
      });
      imageUrl = uploadResponse.secure_url;
    }

    const data = await prisma.blog.create({
      data: {
        title,
        description,
        userId,
        imageUrl,
      },
    });

    res.status(201).json(data);
  } catch (err) {
    console.error("Error while creating blog post:", err);
    res.status(500).json({ message: "Error while creating blog post" });
  }
};

// Delete a Blog
export const blogDelete = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Blog ID is required to delete a blog." });
    }

    const deletedBlog = await prisma.blog.delete({
      where: {
        blog_id: id, // Ensure this matches the correct field in your Prisma schema
      },
    });

    res.status(200).json(deletedBlog);
  } catch (err) {
    console.error("Error while deleting blog:", err);
    res.status(500).json({ message: "Error while deleting blog" });
  }
};
