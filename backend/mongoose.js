import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

import { formInfoModel } from "./models/formInfo.js";
import { markerInfoModel } from "./models/markerInfo.js";

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch((err) => {
    console.log(`Connection failed. ${err}`);
  });

const getMemories = async (req, res, next) => {
  const formInfos = await formInfoModel.find().sort({ _id: -1 }).exec();
  const markerInfos = await markerInfoModel.find().sort({ _id: -1 }).exec();

  // const reversedFormInfos = formInfos.reverse();
  // const reversedMarkerInfos = markerInfos.reverse();
  // console.log(formInfos, markerInfos);
  res.json({
    dataForForm: formInfos,
    dataForMarker: markerInfos,
  });
};

//   ***
// checking if both data types received
let incomingFormData;
let incomingMarkerData;
const createMemory = async (req, res, next) => {
  if (req.body.type === "marker") {
    const createdMarkerInfo = new markerInfoModel({
      lat: req.body.lat,
      lng: req.body.lng,
      id2: req.body.id,
      type: "marker",
    });
    incomingMarkerData = createdMarkerInfo;
  }
  if (req.body.type === "form") {
    const createdFormInfo = new formInfoModel({
      enteredClubName: req.body.enteredClubName,
      arrangedDate: req.body.arrangedDate,
      arrangedDuration: req.body.arrangedDuration,
      type: req.body.type,
      id2: req.body.id,
    });

    incomingFormData = createdFormInfo;
  }
  if (incomingFormData && incomingMarkerData) {
    // mockMarkerDb.unshift(incomingMarkerData);
    // mockFormDb.unshift(incomingFormData);
    // console.log(incomingFormData, incomingMarkerData);
    const resultForm = await incomingFormData.save();
    const resultMarker = await incomingMarkerData.save();
    incomingFormData = undefined;
    incomingMarkerData = undefined;
  }

  //   console.log(req.body);
  res.json({ msg: "New memory added successfully." });
};

const deleteMemory = async (req, res) => {
  const { id1 } = req.params;

  const idForForm = id1.slice(0, 24);
  const idForMarker = id1.slice(24);
  console.log(idForForm, idForMarker);
  await formInfoModel.deleteOne({ _id: idForForm });

  await markerInfoModel.deleteOne({ _id: idForMarker });

  res.json({ msg: "Memory successfully deleted." });
};

export { createMemory, getMemories, deleteMemory };
