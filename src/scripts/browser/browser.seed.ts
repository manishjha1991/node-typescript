import { expect } from "chai";
import * as parse from "csv-parse";
import * as fs from "fs";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as path from "path";
import { options } from "../../constant";
import Model from "../../api/Browser/browser.model";
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
  const jsonPath = path.join(__dirname, "browser.csv");
  fs.readFile(jsonPath, (err, fileData: any) => {
    parse(fileData, { trim: true }, (err, rows) => {
      let browserId,
        browserName,
        browserGroupId,
        browserGroupName,
        browserLink,
        mdmId;
      _.each(rows, async row => {
        if (row[1].indexOf("||") > -1) {
          browserGroupName = row[1].split("||")[0];
          browserGroupId = row[1].split("||")[1];
        }
        browserId = row[0];
        browserName = row[1];
        browserLink = row[2];
        mdmId = row[3];
        if (browserId !== "") {
          browserId = Number.parseInt(browserId);
          let insertingInformation = {
            _id: mdmId,
            browserId: browserId,
            browserName: browserName.trim(),
            browserGroupId: browserGroupId,
            browserGroupName: browserGroupName.trim(),
            browserLink: browserLink,
            imageLink: null,
            isActive: true
          };
          await Model.findOneAndUpdate(
            {
              _id: mdmId
            },
            insertingInformation,
            { upsert: true }
          );
        }
      });
    });
  });
});

describe("BROWSER", () => {
  it("SEED_BROWSER", () => {
    expect(true).to.equal(true);
  });
});
