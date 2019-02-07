import { Router, Request, Response, NextFunction } from "express";
import BrowserController from "./browser.controller";

export class BrowserRouter {
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
    this.router.get("/", BrowserController.get);
    this.router.get("/:groupId", BrowserController.getBrowserByGroupId);
  }
}

//
// Create Router and export its configured Express.Router
const browserRoutes = new BrowserRouter();
browserRoutes.init();

export default browserRoutes.router;
