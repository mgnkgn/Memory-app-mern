import mongoose from "mongoose";

const formInfoSchema = new mongoose.Schema({
  enteredClubName: { type: String, required: true },
  arrangedDate: { type: String, required: true },
  arrangedDuration: { type: String, required: true },
  type: { type: String, required: true },
  id2: { type: String, required: true },
});

const formInfoModel = mongoose.model("FormInfo", formInfoSchema);

export { formInfoModel };
