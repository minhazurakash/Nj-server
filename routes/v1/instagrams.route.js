const express = require("express");
const instagramsControllers = require("../../controllers/instagrams.controller");

const instagramRouter = express.Router();

instagramRouter
  .route("/")
  .get(instagramsControllers.getAllInstagrams)
  .post(instagramsControllers.postSingleInstagram)

  


instagramRouter
  .route("/:id")
  .get(instagramsControllers.getSingleInstagram)
  .put(instagramsControllers.updateSingleInstagram)
  .delete(instagramsControllers.deleteSingleInstagram);

module.exports = instagramRouter;
