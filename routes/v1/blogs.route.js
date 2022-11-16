const express = require("express");
const blogsControllers = require("../../controllers/blogs.controller");

const blogRouter = express.Router();

blogRouter
  .route("/")
  .get(blogsControllers.getAllBlogs)
  


// blogRouter
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = blogRouter;
