import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import Model from "./group.model";
import { success, failure } from "../../utils/buildResponse";
export default class GroupController {
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
      let result = await Model.find({}).exec();

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
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @param {Request.params.groupId} groupId
   */
  public static async getGroupByGroupId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      let groupId = req.params.groupId;
      //
      // GET Group By GroupId
      let result = await Model.find({ groupId: groupId }).exec();
      res.send(success(result));
    } catch (err) {
      // Error response
      res.send(failure(err));
    }
  }
}
