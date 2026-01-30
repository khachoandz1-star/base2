import { Router } from "express";
import { getAll,getOne,createOne,deleteOne,updateOne } from "../controllers/post.controller";

const postRouter = Router();

postRouter.get("/",getAll);
postRouter.get("/:id",getOne);
postRouter.post("/",createOne);
postRouter.delete("/:id",deleteOne);
postRouter.put("/:id",updateOne);

export default postRouter;