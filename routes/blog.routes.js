import express from "express"
const router = express.Router()
import {addBlog} from "../controllers/blog.controller.js"
import asyncWrap from "../utils/AsyncWrap.js";
import getUpload from "../utils/Cloudnery.js";
const  uploadBlog = getUpload("blog")
import { getallblog, getblogbyid, deleteblogbyid, editblog } from "../controllers/blog.controller.js";

router.post("/add-blog", uploadBlog.single("coverImage"),  asyncWrap(addBlog));
router.get("/getallblog", asyncWrap(getallblog))
router.get("/getblogbyid/:id", asyncWrap(getblogbyid))
router.delete("/deleteblogbyid/:id", asyncWrap(deleteblogbyid))
router.put("/editblog/:id", uploadBlog.single("coverImage"), asyncWrap(editblog))

export default router