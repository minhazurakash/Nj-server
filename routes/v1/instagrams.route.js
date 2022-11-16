const express = require("express");
const instagramsControllers = require("../../controllers/instagrams.controller");

const instagramRouter = express.Router();

instagramRouter
  .route("/")
  .get(instagramsControllers.getAllInstagrams)
  


// instagramRouter
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = instagramRouter;
