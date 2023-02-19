import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

export { UserModel };
