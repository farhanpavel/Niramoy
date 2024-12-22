import express from "express";
import {
  feedbackGet,
  feedbackPost,
} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();
feedbackRouter.get("/", feedbackGet);
feedbackRouter.post("/", feedbackPost);
export default feedbackRouter;
