import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { getUserDetails, getUserURLs } from '../controllers/userController.js'

const userRouter = Router();

userRouter.get("/me", protect, getUserDetails);
userRouter.get("/my/urls", protect, getUserURLs);

export default userRouter;