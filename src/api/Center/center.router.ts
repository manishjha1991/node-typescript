import { Router, Request, Response, NextFunction } from "express";
import CenterController from "./center.controller";

export class CenterRouter {
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
    this.router.get("/", CenterController.get);
    
  }
}

//
// Create Router and export its configured Express.Router
const centerRoutes = new CenterRouter();
centerRoutes.init();

export default centerRoutes.router;
