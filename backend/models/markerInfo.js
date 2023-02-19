import mongoose from "mongoose";

const markerInfoSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  id2: { type: String, required: true },
  type: { type: String, required: true },
});

const markerInfoModel = mongoose.model("markerInfo", markerInfoSchema);

export { markerInfoModel };
