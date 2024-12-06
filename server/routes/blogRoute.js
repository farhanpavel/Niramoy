import express from "express";
import {
  blogGet,
  blogDelete,
  blogPost,
} from "../controllers/blogController.js";

const blogRouter = express.Router();
blogRouter.get("/", blogGet);

blogRouter.post("/", blogPost);
blogRouter.delete("/:id", blogDelete);
export default blogRouter;
