import { Schema, model } from "mongoose";
let schema: Schema = new Schema(
  {
    groupId: { type: String, default: null },
    groupName: { type: String, default: null },
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

export default model("Group", schema);