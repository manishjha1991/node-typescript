import { expect } from "chai";
import * as parse from "csv-parse";
import * as fs from "fs";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as path from "path";
import { options } from "../../constant";
import Model from "../../api/App/app.model";
(<any>mongoose).Promise = global.Promise;
beforeEach(async () => {
  await mongoose.connect(
    "mongodb://localhost:27017/doc_mdm",
    options,
    async err => {
      if (err) {
        throw err;
      }
    }
  );
  const jsonPath = path.join(__dirname, "app.csv");

  fs.readFile(jsonPath, (err, fileData: any) => {
    parse(fileData, { trim: true }, (err, rows) => {
      let appId, appName, groupId, groupName, appLink, isPlayStore;
      _.each(rows, async row => {
        if (row[1].indexOf("||") > -1) {
          groupName = row[1].split("||")[0];
          groupId = row[1].split("||")[1];
        }
        appId = row[0];
        appName = row[1];
        appLink = row[2];
        isPlayStore = row[3];
        if (appId !== "") {
          appId = Number.parseInt(appId);
          let insertingInformation = {
            appId: appId,
            appName: appName.trim(),
            groupId: groupId,
            groupName: groupName.trim(),
            appLink: appLink,
            isPlayStore: isPlayStore,
            isActive: true
          };
          await Model.findOneAndUpdate(
            {
              appId
            },
            insertingInformation,
            { upsert: true }
          );
        }
      });
    });
  });
});
describe("APP", () => {
  it("SEED_APP", () => {
    expect(true).to.equal(true);
  });
});
