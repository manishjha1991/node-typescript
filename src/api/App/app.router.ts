import { Router, Request, Response, NextFunction } from "express";
import AppController from "./app.controller";

export class AppRouter {
  public router: Router;

  /*--------  Constructor  --------*/

  constructor() {
    //
    // Set router
    this.router = Router();
    this.init();
  }

  /*--------  Methods  --------*/

  /**
   * Init all routes in this router
   */
  init() {
    this.router.get("/", AppController.get);
    this.router.get("/:groupId", AppController.getAppByGroupId);
  }
}

//
// Create Router and export its configured Express.Router
const appRoutes = new AppRouter();
appRoutes.init();

export default appRoutes.router;
