import express from "express";
import {
  feedbackGet,
  feedbackPost,
  updateMood,
  updateMealStatus,
  updateWorkoutStatus,
} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();
feedbackRouter.get("/", feedbackGet);
feedbackRouter.post("/", feedbackPost);
feedbackRouter.put("/mood", updateMood);
feedbackRouter.put("/meal", updateMealStatus);
feedbackRouter.put("/workout", updateWorkoutStatus);
export default feedbackRouter;
