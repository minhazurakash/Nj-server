const express = require("express");
const usersControllers = require("../../controllers/users.controller");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(usersControllers.getAllUsers)
  .post(usersControllers.postSingleUser)
  .put(usersControllers.updateSingleUser)


  


userRouter
  .route("/admin")
  // .put(usersControllers.updateAdmin)


module.exports = userRouter;
