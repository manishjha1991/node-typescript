import { expect } from "chai";
import * as parse from "csv-parse";
import * as fs from "fs";
import * as _ from "lodash";
import * as mongoose from "mongoose";
import * as path from "path";
import { options } from "../../constant";
import Model from "../../api/Group/group.model";
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
  const jsonPath = path.join(__dirname, "group.csv");
  fs.readFile(jsonPath, (err, fileData: any) => {
    parse(fileData, { trim: true }, (err, rows) => {
      let groupId, groupName;
      _.each(rows, async row => {
        groupName = row[1];
        if (row[0] !== "") {
          groupId = Number.parseInt(row[0]);
          let insertingInformation = {
            groupId: groupId,
            groupName: groupName,
            isActive: true
          };
          await Model.findOneAndUpdate(
            {
              groupId
            },
            insertingInformation,
            { upsert: true }
          );
        }
      });
    });
  });
});

describe("GROUP", () => {
  it("SEED_GROUP", () => {
    expect(true).to.equal(true);
  });
});
