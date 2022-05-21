import * as express from "express";
import controller from "./controller";
import isAuthenticated from "../../middlewares/isAuthenticated";
import isAdmin from "../../middlewares/isAdmin";

const basePath = "/boat-types";

export default express
  .Router()
  .get(basePath, isAuthenticated, isAdmin, controller.getAll)
  .post(basePath, isAuthenticated, isAdmin, controller.addBoatType)
  .get(`${basePath}/:id`, isAuthenticated, isAdmin, controller.getBoatType)
  .put(`${basePath}/:id`, isAuthenticated, isAdmin, controller.updateBoatType)
  .delete(
    `${basePath}/:id`,
    isAuthenticated,
    isAdmin,
    controller.deleteBoatType
  );
