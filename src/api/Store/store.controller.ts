import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import { login, post, sendMessageToStoreManager } from "../../utils/action";
import Model from "../Store/store.model";
import BrowserModel from "../Browser/browser.model";
import AppModel from "../App/app.model";
import { success, failure } from "../../utils/buildResponse";

interface IUserRequest extends Request {
  files: any;
}
export default class StoreController {
  /**
   * Create
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      let getApps: any;
      let getBrowsers: any;
      const deviceInformation = req.body;
      const storemanagerLogin: any = await login(deviceInformation);
      // console.log(
      //   storemanagerLogin,
      //   "GET STORE MANAGER STORE_ID AND CIRCLE_ID FROM LOGIN_API"
      // );
      const { groupName, olmId, centerId, deviceId } = deviceInformation;
      // FIRST CHECK THAT SAME STORE HAVE CONFIGURE WITH SAME GROUP
      getApps = await Model.find(
        { storeId: storemanagerLogin.result.storeid, groupName: groupName },
        { _id: 0, selectedApps: 1 }
      ).exec();
      getBrowsers = await BrowserModel.find(
        {
          storeId: storemanagerLogin.result.storeid,
          browserGroupName: groupName
        },
        { _id: 0, selectedBrowser: 1 }
      ).exec();
      // IF BOTH BROWSER AND APPS FOUND IN SAME STORE
      if (getApps.length && getBrowsers.length) {
        getApps = getApps.selectedApps;
        getBrowsers = getBrowsers.selectedBrowser;

        // IF  APPS FOUND IN SAME STORE BUT  BROWSER NOT
      } else if (getApps.length && !getBrowsers.length) {
        getApps = getApps[0].selectedApps;
        getBrowsers = await BrowserModel.find(
          { browserGroupName: groupName },
          { _id: 0, browserId: 1, browserName: 1, browserLink: 1 }
        ).exec();
        // IF  BOTH APPS  AND BROWSER NOT FOUND IN SAME STORE THEN WE NEED TO GET APP AND BROWSER INFORMATION FROM APP AND BROWSER MODEL
      } else if (!getApps.length && !getBrowsers.length) {
        getApps = await AppModel.find(
          { groupName: groupName },
          { _id: 0, appId: 1, appName: 1, appLink: 1, isPlayStore: 1 }
        ).exec();

        getBrowsers = await BrowserModel.find(
          { browserGroupName: groupName },
          { _id: 0, browserId: 1, browserName: 1, browserLink: 1 }
        ).exec();
      }
      let insertingInformation = Object.assign({}, deviceInformation, {
        storeId: storemanagerLogin.result.storeid,
        circleId: storemanagerLogin.result.circleid,
        selectedBrowser: getBrowsers,
        selectedApps: getApps,
        centerId: centerId,
        olmId: olmId,
        groupName: groupName
      });
      const result = await Model.findOneAndUpdate(
        {
          storeId: insertingInformation.storeId,
          deviceId: deviceId,
          circleId: insertingInformation.circleId,
          groupName: groupName
        },
        { $set: insertingInformation },
        { upsert: true, new: true }
      ).exec();

      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(success(failure));
    }
  }

  /**
   * Get all
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async get(req: Request, res: Response, next: NextFunction) {
    try {
      //
      // Get data
      let result = await Model.find().exec();

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
  /**
   * Get all Circle for Center
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async getCircleForCenterId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let centerId = req.params.centerId;
      //
      // Get data
      let getCircle = await Model.find(
        { centerId: centerId },
        { _id: 0 }
      ).exec();
      const result = _.uniqBy(getCircle, "circleId");
      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
  /**
   * Get  Store By deviceId ,storeId,and GroupName
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.body} storeId,deviceId,groupName
   */
  public static async getStoreByGroupName(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      // GET Store By storeId,deviceId,deviceId
      let storeId = req.body.storeId;
      const deviceId = req.body.deviceId;
      const groupName = req.body.groupName;
      let result = await Model.find({
        storeId: storeId,
        deviceId: deviceId,
        groupName: groupName
      }).exec();

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * Get all Store By StoreId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.storeId} storeId
   */
  public static async getStoreByStoreId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      // GET Store By storeId
      let storeId = req.params.storeId;
      let result = await Model.find({ storeId: storeId }).exec();

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * Get all Store By CenterId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.centerId} centerId
   */
  public static async getStoreByCenterId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //
      // GET Store By centerId
      let centerId = req.params.centerId;
      let result = await Model.find({ centerId: centerId }).exec();

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * Get all
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.circleId} circleId
   */
  public static async getStoreByCircleId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let circleId = req.params.circleId;
      //
      // GET Store By circleId
      let getStoreByCircleId = await Model.find({ circleId: circleId }).exec();

      const result = _.uniqBy(getStoreByCircleId, "storeId");
      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * update By StoreId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.storeId} storeId
   */
  public static async updateStoreByStoreId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let storeId = req.params.storeId;
      let storeInformation = req.body;
      //
      // Update Store By storeId

      let selectedApps = [];
      await Model.updateMany(
        { storeId: storeId },
        { $set: { selectedApps } }
      ).exec();
      let result = await Model.updateMany(
        { storeId: storeId },
        { $set: storeInformation }
      );

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
  /**
   * update By CircleId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.circleId} circleId
   */
  public static async updateStoreByCircleId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let circleId = req.params.circleId;
      let storeInformation = req.body;
      //
      // Update Store By CircleId

      let selectedApps = [];
      await Model.updateMany(
        { circleId: circleId },
        { $set: { selectedApps } }
      ).exec();
      let result = await Model.updateMany(
        { circleId: circleId },
        { $set: storeInformation }
      ).exec();

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * update By CenterId
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.circleId} circleId
   */
  public static async updateStoreByCenterId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let CenterId = req.params.CenterId;
      let storeInformation = req.body;
      //
      // Update Store By CircleId

      let selectedApps = [];
      await Model.updateMany(
        { CenterId: CenterId },
        { $set: { selectedApps } }
      ).exec();
      let result = await Model.updateMany(
        { CenterId: CenterId },
        { $set: storeInformation }
      );

      //
      // Response
      res.send(success(result));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
  /**
   * Get  Store By deviceId ,storeId,and GroupName
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.body} storeId deviceId groupName
   */
  public static async message(req: Request, res: Response, next: NextFunction) {
    try {
      let storeId = req.body.storeId;
      const deviceId = req.body.deviceId;
      const groupName = req.body.groupName;
      let result: any = await Model.find({
        storeId: storeId,
        deviceId: deviceId,
        groupName: groupName
      }).exec();
      console.log(result[0].olmId, "RESULT_FOR_MESSAGE");
      let getStoreManagerInformationFromOlmId: any = await post(
        result[0].olmId
      );
      console.log(
        getStoreManagerInformationFromOlmId,
        "GET CONTACT NUMBER OF STORE MANAGER FROM BOTNY API PASSING OLM ID"
      );
      let message: string = `Battery of your device ${deviceId}  at store ${storeId} has gone below 15%. Please take action accordingly`;
      console.log(message, "MESSAGE");
      let contactNumber: string =
        getStoreManagerInformationFromOlmId.result.empList.mobileNo;
      let sendMessageToStore = await sendMessageToStoreManager(
        contactNumber,
        message
      );
      //
      // Response
      res.send(success(sendMessageToStore));
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }

  /**
   * Get  network status By deviceId ,storeId,and GroupName
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.body} storeId deviceId groupName
   */

  public static async checkNetworkForDevice(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let storeId = req.body.storeId;
      const deviceId = req.body.deviceId;
      const groupName = req.body.groupName;
      const currentTimeStamp = Date.now();
      let result: any = await Model.findOneAndUpdate(
        {
          storeId: storeId,
          deviceId: deviceId,
          groupName: groupName
        },
        { $set: { checkNetWorkStatus: currentTimeStamp } },
        { upsert: true, new: true }
      ).exec();
      res.send(success(result));
    } catch (err) {
      res.send(failure(err));
    }
  }

  /**
   * Upload Image
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.files} file,file..name
   */

  public static async uploadImage(
    req: IUserRequest,
    res: Response,
    next: NextFunction
  ) {
    let imageFile = req.files.file;
    let filename = req.files.file.name;
    imageFile.mv(`${__dirname}/public/${filename}`, function(err) {
      if (err) {
        res.send(failure(err));
      }

      res.send(success({ file: `public/${filename}` }));
    });
  }
}
