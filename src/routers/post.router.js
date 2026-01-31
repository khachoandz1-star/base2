import { Router } from "express";
import { getAll,getOne,createOne,updateOne,deleteOne } from "../controllers/post.controller";


import { validateRequest } from "../middlewares/validateRequest";
import schema from "../validations/post.validation";

const postRouter=Router();

postRouter.get("/",getAll);
postRouter.get("/:id",getOne);
postRouter.post("/",validateRequest(schema),createOne);
postRouter.put("/:id",validateRequest(schema),updateOne);
postRouter.delete("/:id",deleteOne);

export default postRouter;