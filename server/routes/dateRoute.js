import express from "express";
import { dateGet, datePost, datePut } from "../controllers/dateController.js";
const dateRouter = express.Router();
dateRouter.get("/:id", dateGet);
dateRouter.put("/:id", datePut);
dateRouter.post("/", datePost);
export default dateRouter;
