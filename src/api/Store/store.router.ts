import { Router, Request, Response, NextFunction } from "express";
import StoreController from "./store.controller";

export class StoreRouter {
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
    this.router.post("/device", StoreController.create);
    this.router.post("/", StoreController.getStoreByGroupName);
    this.router.get("/", StoreController.get);
    this.router.get("/:centerId/center", StoreController.getCircleForCenterId);
    this.router.get("/:storeId", StoreController.getStoreByStoreId);
    this.router.get("/:circleId/circle", StoreController.getStoreByCircleId);
    this.router.get("/:centerId", StoreController.getStoreByCenterId);
    //>>>>>>> Update Routes//
    // NOTE ->
    //These Routes Update store data by center,circle and store
    this.router.put("/:storeId", StoreController.updateStoreByStoreId);
    this.router.put("/:centerId", StoreController.updateStoreByCenterId);
    this.router.put("/:circleId", StoreController.updateStoreByCircleId);
    // SEND MESSAGE TO STORE MANAGER

    this.router.post("/message", StoreController.message);
    this.router.post("/checkNetwork", StoreController.checkNetworkForDevice);
  }
}

//
// Create Router and export its configured Express.Router
const storeRoutes = new StoreRouter();
storeRoutes.init();

export default storeRoutes.router;
