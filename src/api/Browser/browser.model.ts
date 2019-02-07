import { Schema, model } from "mongoose";

let schema: Schema = new Schema(
  {
    _id: { type: String, default: null },
    browserId: { type: String, default: null },
    browserName: { type: String, default: null },
    browserGroupId: { type: Number, default: null },
    browserLink: { type: String, default: null },
    browserGroupName: { type: String, default: null },
    imageLink: { type: String, default: null },
    isActive: {
      type: Boolean,
      default: true
    },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    timestamps: true,
    versionKey: false
  }
);
export default model("Browser", schema);
