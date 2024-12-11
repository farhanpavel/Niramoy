import { promptGetById } from "../controllers/promptController.js";
import express from "express";

const promptRouter = express.Router();
promptRouter.get("/:id", promptGetById);
export default promptRouter;
