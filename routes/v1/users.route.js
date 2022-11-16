const express = require("express");
const usersControllers = require("../../controllers/users.controller");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersControllers.getAllUsers)
  


// userRouter
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = userRouter;
