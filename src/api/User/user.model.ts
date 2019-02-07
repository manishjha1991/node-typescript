import { Schema, model } from "mongoose";

let schema: Schema = new Schema({
  emailId: String,
  password: String,
  olmId: String
});

export default model("User", schema);
