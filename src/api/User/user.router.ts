import { Router, Request, Response, NextFunction } from "express";
import UserController from "./user.controller";

export class UserRouter {
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
    this.router.get("/", UserController.getAll);
    this.router.post("/", UserController.create);
    this.router.post("/login", UserController.login);
  }
}

//
// Create Router and export its configured Express.Router
const userRoutes = new UserRouter();
userRoutes.init();

export default userRoutes.router;
