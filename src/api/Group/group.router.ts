import { Router, Request, Response, NextFunction } from "express";
import GroupController from "./group.controller";

export class GroupRouter {
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
    this.router.get("/", GroupController.get);
    this.router.get("/:groupId", GroupController.getGroupByGroupId);
  }
}

//
// Create Router and export its configured Express.Router
const groupRoutes = new GroupRouter();
groupRoutes.init();

export default groupRoutes.router;
