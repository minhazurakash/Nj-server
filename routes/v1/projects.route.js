const express = require("express");
const projectsControllers = require("../../controllers/projects.controller");

const router = express.Router();

router
  .route("/")
  .get(projectsControllers.getAllProjects)
  .post(projectsControllers.postSingleProject)

  


router
  .route("/:id")
  .get(projectsControllers.getSingleProject)
  .put(projectsControllers.updateSingleProject)
  .delete(projectsControllers.deleteSingleProject);

module.exports = router;
