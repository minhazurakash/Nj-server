const express = require("express");
const blogsControllers = require("../../controllers/blogs.controller");

const blogRouter = express.Router();

blogRouter
  .route("/")
  .get(blogsControllers.getAllBlogs)
  .post(blogsControllers.postSingleBlog)

  


blogRouter
  .route("/:id")
  .get(blogsControllers.getSingleBlog)
  .put(blogsControllers.updateSingleBlog)
  .delete(blogsControllers.deleteSingleBlog);

module.exports = blogRouter;
