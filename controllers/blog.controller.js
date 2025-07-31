import Blog from "../models/blog.schema.js";
import ExpressError from "../utils/ExpressError.js";
import {
    v2 as cloudinary
} from 'cloudinary';

const addBlog = async (req, res) => {

    const {
        title,
        content,
        author



    } = req.body;



    if (!title || !content || !author) {
        return next(new ExpressError(400, "Title, content are required."))

    }
    const coverImage = {
        url: req.file?.path || "",
        public_id: req.file?.filename || "",
    };
    const newBlog = new Blog({
        title,
        content,
        coverImage,
        author


    });

    await newBlog.save();
    res.status(201).json({
        message: "Blog created successfully"
    });

};

const getallblog = async (req, res) => {
    const blog = await Blog.find().sort({
        createdAt: -1
    });
    res.json(blog)
}

const getblogbyid = async (req, res) => {
    const {
        id
    } = req.params
    const blog = await Blog.findById(id)
    if (!blog) {
        return next(new ExpressError(404, "Blog Not Found"))
    }
    res.json(blog)
}

const deleteblogbyid = async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findById(id);
  if (!blog) {
    throw new ExpressError(404, "Blog not found");
  }

  // ✅ Use correct field: blog.coverImage.public_id
  if (blog.coverImage && blog.coverImage.public_id) {
    await cloudinary.uploader.destroy(blog.coverImage.public_id);
  }

  await Blog.findByIdAndDelete(id);

  res.status(200).json({
    message: "Blog and image deleted successfully",
  });
};

const editblog = async (req, res, next) => {

    const {
        id
    } = req.params;
    const {
        title,
        author,
        content
    } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
        return res.status(404).json({
            message: "Blog not found"
        });
    }


    if (req.file) {
        if (blog.coverImage && blog.coverImage.public_id) {
            await cloudinary.uploader.destroy(blog.coverImage.public_id);
        }

        blog.coverImage = {
            url: req.file.path,
            public_id: req.file.filename,
        };
    }

    blog.title = title;
    blog.author = author;
    blog.content = content;

    await blog.save();

    res.status(200).json({
        message: "Blog updated successfully",
        blog
    });

};




export {
    addBlog,
    getallblog,
    getblogbyid,
    deleteblogbyid,
    editblog
}