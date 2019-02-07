import { expect } from "chai";
import * as parse from "csv-parse";
import * as fs from "fs";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as path from "path";
import { options } from "../../constant";
import Model from "../../api/Center/center.model";
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
  const jsonPath = path.join(__dirname, "center.csv");
  fs.readFile(jsonPath, (err, fileData: any) => {
    parse(fileData, { trim: true }, (err, rows) => {
      let centerId: Number, centerName: String;
      _.each(rows, async row => {
        if (row[0] && row[1]) {
          centerId = row[0];
          centerName = row[1];
        }
        if (row[0] !== "") {
          centerId = Number.parseInt(row[0]);
          let insertingInformation = {
            centerId: centerId,
            centerName: centerName,
            isActive: true
          };
          await Model.findOneAndUpdate(
            {
              centerId
            },
            insertingInformation,
            { upsert: true }
          );
        }
      });
    });
  });
});
describe("CENTER", () => {
  it("SEED_CENTER", () => {
    expect(true).to.equal(true);
  });
});
