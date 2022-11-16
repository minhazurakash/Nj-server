const express = require("express");
const slidersControllers = require("../../controllers/sliders.controller");

const sliderRouter = express.Router();

sliderRouter
  .route("/")
  .get(slidersControllers.getAllSliders)
  


// sliderRouter
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = sliderRouter;
