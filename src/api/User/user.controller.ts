import { Request, Response, NextFunction } from "express";
import * as _ from "lodash";
import Model from "./user.model";
import Bycrypt from "../../utils/crypto";
import { success, failure } from "../../utils/buildResponse";
import { resolve6 } from "dns";
export default class UserController {
  /**
   * Get all
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async getAll(req: Request, res: Response, next: NextFunction) {
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
   * Create
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bycrypt = new Bycrypt();
      //
      //Checking OLM ID IS PRESENT OR NOT
      const olmId = req.body.olmId;
      let result = await Model.find({ olmId: olmId }).exec();
      console.log(result, "RESULT");

      if (result.length == 0) {
        const userInformation = Object.assign({}, req.body, {
          password: await bycrypt.hashPassword(req.body.password)
        });
        //
        // Create model
        let model = new Model(userInformation);

        //
        // Save
        await model.save();
        res.send(success(model));
      } else {
        throw new Error("OLM Id Already Present");
      }
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
  /**
   * Create
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const bycrypt = new Bycrypt();

      const olmId = req.body.olmId;
      const password = req.body.password;
      //
      //Checking OLM ID IS PRESENT OR NOT
      let result: any = await Model.find(
        { olmId: olmId },
        { password: 1, _id: 0, olmId: 1, emailId: 1 }
      ).exec();

      if (result.length > 0) {
        const hashPassword = result[0].password;

        const checkPassword = await bycrypt.comparePassword(
          password,
          hashPassword
        );
        console.log(checkPassword);
        if (checkPassword) {
          res.send(success(result));
        } else {
          throw new Error("Password and OlmId Missmatch");
        }
      } else {
        throw new Error("No User Found");
      }
    } catch (err) {
      //
      // Error response
      res.send(failure(err));
    }
  }
}
