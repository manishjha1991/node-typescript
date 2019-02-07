import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import Model from "./center.model";
import { success, failure } from "../../utils/buildResponse";
export default class BrowserController {
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
}
