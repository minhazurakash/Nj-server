const express = require("express");
const slidersControllers = require("../../controllers/sliders.controller");

const sliderRouter = express.Router();

sliderRouter
  .route("/")
  .get(slidersControllers.getAllSliders)
  .post(slidersControllers.postSingleSlider)

  


sliderRouter
  .route("/:id")
  .get(slidersControllers.getSingleSlider)
  .put(slidersControllers.updateSingleSlider)
  .delete(slidersControllers.deleteSingleSlider);

module.exports = sliderRouter;
