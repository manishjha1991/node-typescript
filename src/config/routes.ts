import { Router, Request, Response, NextFunction } from "express";
import * as cors from "cors";
import * as cron from "node-cron";
import { post, sendMessageToStoreManager } from "../utils/action";
import Model from "../api/Store/store.model";
import UserRouter from "../api/User/user.router";
import AppRouter from "../api/App/app.router";
import BrowserRouter from "../api/Browser/browser.router";
import CenterRouter from "../api/Center/center.router";
import StoreRouter from "../api/Store/store.router";
import GroupRouter from "../api/Group/group.router";
/*--------  Start CronJob  --------*/
cron.schedule("* * * * *", async function() {
  const checkNetWorkStatusDate: any = await Model.find(
    {},
    { _id: 0, checkNetWorkStatus: 1, olmId: 1, deviceId: 1, storeId: 1 }
  );
  checkNetWorkStatusDate.forEach(async element => {
    const diff: any = Math.abs(
      new Date().getTime() - new Date(element.checkNetWorkStatus).getTime()
    );
    const minutes = Math.floor(diff / 1000 / 60);
    console.log(minutes, "Minutes");
    if (minutes > 5) {
      let getStoreManagerInformationFromOlmId: any = await post(element.olmId);
      let message: string = `Connection of your device ${
        element.deviceId
      }  at store ${element.storeId} has gone. Please take action accordingly`;
      console.log(message, "MESSAGE");
      let contactNumber: string =
        getStoreManagerInformationFromOlmId.result.empList.mobileNo;
      let sendMessageToStore = await sendMessageToStoreManager(
        contactNumber,
        message
      );
      console.log(sendMessageToStore, "SEND_MESSAGE_TO_STORE");
    } else {
      console.log("No Need To send");
    }
  });
});
/*--------  End CronJob  --------*/
export default class Routes {
  public router: Router;
  private app;

  /*--------  Constructor  --------*/

  constructor(app) {
    //
    // Set router
    this.router = Router();

    //
    // Set app
    this.app = app;

    //
    // Set all routes
    this.setAllRoutes();
  }

  /*--------  Methods  --------*/

  /**
   * Set all app routes
   */
  setAllRoutes() {
    this.app.use(cors());
    /*--------  Set all custom routes here  --------*/

    //
    // Your routes goes here
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/app", AppRouter);
    this.app.use("/api/browser", BrowserRouter);
    this.app.use("/api/center", CenterRouter);
    this.app.use("/api/store", StoreRouter);
    this.app.use("/api/group", GroupRouter);
    /*--------  Main routes  --------*/

    //
    // Set main route for any other route found
    this.setMainRoute();
  }

  /**
   * Set main route
   * this route will be used for all other routes not found before
   */
  private setMainRoute() {
    //
    // All other routes should redirect to the index.html
    this.app.route("/*").get(this.index);
  }

  /**
   * Main route
   */
  private index(req: Request, res: Response, next: NextFunction) {
    res.json({
      message: "Hello World!"
    });
  }
}
