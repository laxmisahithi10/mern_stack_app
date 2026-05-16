import { Router } from "express";
import createShortURL, { redirect, updateShortURL, deleteShortURL } from "../controllers/shortUrlController.js";
import { protect } from "../middlewares/authMiddleware.js";

const shortURLRouter = Router();

shortURLRouter.post("/", protect, createShortURL);
shortURLRouter.get("/:shortCode", redirect);
shortURLRouter.patch("/:shortCode", protect, updateShortURL);
shortURLRouter.delete("/:shortCode", protect, deleteShortURL);

export default shortURLRouter;
