const express = require("express");
const servicesControllers = require("../../controllers/services.controller");

const serviceRouter = express.Router();

serviceRouter
  .route("/")
  .get(servicesControllers.getAllsServices)
  .post(servicesControllers.postSingleService);

serviceRouter
  .route("/:id")
  .get(servicesControllers.getSingleService)
  .delete(servicesControllers.deleteSingleService)
  .put(servicesControllers.updateSingleService);

module.exports = serviceRouter;
