const express = require("express");
const projectsControllers = require("../../controllers/projects.controller");

const router = express.Router();

router
  .route("/")
  .get(projectsControllers.getAllProjects)
  


// router
//   .route("/:id")
//   .get(viewCount, limiter, toolsControllers.getToolDetail)
//   .patch(toolsControllers.updateTool)
//   .delete(toolsControllers.deleteTool);

module.exports = router;
