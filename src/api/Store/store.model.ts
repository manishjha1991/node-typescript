import { Schema, model } from "mongoose";
import  uuid from "uuid";
let schema: Schema = new Schema(
  {
    storeId: { type: String, default: null },
    centerId: { type: String, default: null },
    circleId: { type: String, default: null },
    groupName: { type: String, default: null },
    olmId: { type: String, default: null },
    deviceId: { type: String, default: null },
    
    sqliteDbLink: {
      dbLink: { type: String, default: null },
      appVersion: { type: String, default: 1 }
    },
    screenSaver: {
      videoLink: String,
      isActive: { type: Boolean, default: true }
    },
    wallpaper : { type: String, default: null },
    selectedApps: {
      type: Array,
      default: []
    },
    blockedApps: {
      type: Array,
      default: ["com.google.android.youtube","com.android.calendar"]
    },
    selectedBrowser: {
      type: Array,
      default: []
    },
    isActive: {
      type: Boolean,
      default: true
    },
   
    checkNetWorkStatus: { type: Date, default: null },
    createdAt: { type: Date, default: null },
    updatedAt: { type: Date, default: null }
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    timestamps: true
  }
);
export default model("Store", schema);
