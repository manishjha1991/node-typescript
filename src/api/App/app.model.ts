import { Schema, model } from "mongoose";
let schema: Schema = new Schema(
  {
    appId: { type: String, default: null },
    appName: { type: String, default: null },
    groupId: { type: Number, default: null },
    appLink: { type: String, default: null },
    groupName: { type: String, default: null },
    isPlayStore:{ type: Boolean, default: true },
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
export default model("App", schema);
