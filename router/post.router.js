import {Router} from "express";
import { addPost, deletePost, getAllPosts, getOnePost, updatePost } from "../controller/server.controller.js";

const router = Router()

router.get("/",getAllPosts);

// GET /posts/:id
router.get("/:id",getOnePost);

//Post/posts
router.post("/", addPost);

//PUT/posts/:id
router.put("/:id", updatePost)

//Delete/posts/:id

//Delete/users/:id
router.delete("/:id", deletePost)

export default router