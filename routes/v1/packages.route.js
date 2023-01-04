const express = require("express");
const packagesControllers = require("../../controllers/packages.controller");

const packageRouter = express.Router();

packageRouter
  .route("/")
  .get(packagesControllers.getAllPackages)
  .post(packagesControllers.postSinglePackage);

packageRouter.route("/:id").delete(packagesControllers.deleteSinglePackage);

module.exports = packageRouter;
