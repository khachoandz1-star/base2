import {Router} from "express";
import postRouter from "./post.router";
import authRouter from "./auth.router";

const router=Router();

router.use("/posts",postRouter);
router.use("/auth", authRouter);

export default router;