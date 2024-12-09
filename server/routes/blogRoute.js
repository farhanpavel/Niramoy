import express from "express";
import {
  blogGet,
  blogDelete,
  blogPost,
  blogGetById,
} from "../controllers/blogController.js";
import upload from "../multerConfig.js";
const blogRouter = express.Router();
blogRouter.get("/", blogGet);
blogRouter.get("/:id", blogGetById);
blogRouter.post("/", upload.single("image"), blogPost);
blogRouter.delete("/:id", blogDelete);
export default blogRouter;
