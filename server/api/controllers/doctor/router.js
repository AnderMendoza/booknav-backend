import * as express from "express";
import controller from "./controller";
import isAuthenticated from "../../middlewares/isAuthenticated";

export default express
  .Router()
  .post("/", isAuthenticated, controller.create)
  .get("/:id", isAuthenticated, controller.get)
  .patch("/:id", isAuthenticated, controller.update)
  .delete("/:id", isAuthenticated, controller.delete);
