const express = require("express");
const packagesControllers = require("../../controllers/packages.controller");

const packageRouter = express.Router();

packageRouter
  .route("/")
  .get(packagesControllers.getAllPackages)
  .post(packagesControllers.postSinglePackage);

packageRouter
  .route("/:id")
  .get(packagesControllers.getSinglePackage)
  .delete(packagesControllers.deleteSinglePackage)
  .put(packagesControllers.updateSinglePackage);

module.exports = packageRouter;
