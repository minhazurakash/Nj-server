const express = require("express");
const ordersControllers = require("../../controllers/orders.cntroller");

const orderRouter = express.Router();

orderRouter
  .route("/")
  .get(ordersControllers.getAllOrders)
  .post(ordersControllers.postSingleOrder);

orderRouter
  .route("/:id")
  .get(ordersControllers.getSingleOrder)
  .put(ordersControllers.updateSingleOrder)
  .delete(ordersControllers.deleteSingleOrder);

module.exports = orderRouter;
