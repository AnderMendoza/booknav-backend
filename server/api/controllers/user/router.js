import * as express from "express";
import controller from "./controller";
import OtpController from "./otpController";
import isAuthenticated from "../../middlewares/isAuthenticated";
import isAdmin from "../../middlewares/isAdmin";

export default express
  .Router()
  .post("/login", controller.login)
  .post(
    "/register",
    // isAuthenticated,
    controller.register
  )
  .post("/otp", OtpController.otp)
  .get("/verify", OtpController.verify)
  .get("/refresh", OtpController.refresh)
  .get("/logout", controller.logout)
  .get("/me", isAuthenticated, controller.me)
  .get("/all", isAuthenticated, isAdmin, controller.getAll);
