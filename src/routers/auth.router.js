import {Router} from "express";
import { signin,signup } from "../controllers/auth.controller";

const authRouter=Router();

authRouter.post("/signup",authRouter);
authRouter.post("/signin",authRouter);

export default authRouter;