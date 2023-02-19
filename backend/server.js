import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";

dotenv.config();

import { createMemory, getMemories, deleteMemory } from "./mongoose.js";
import { UserModel } from "./models/users.js";
import { verifyToken } from "./middleware/auth.js";

const port = 8000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/memories", getMemories);

app.get("/api/spacer", verifyToken, (req, res) => {
  res.json({ msg: "Spacer" });
});

app.post("/api/memories/new", createMemory);

app.delete("/api/memories/:id1", deleteMemory);

app.post("/api/admin", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!(username && password)) {
      res.status(400).send("Please fill every form element.");
    }

    const existingUser = await UserModel.findOne({ username });

    if (existingUser) {
      return res.status(409).send("User already exist, please login.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username: username,
      password: encryptedPassword,
    });

    const token = jwt.sign({ user_id: user._id }, process.env.TOKEN, {
      expiresIn: "3h",
    });

    user.token = token;
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!(username && password)) {
      res.status(400).send("Please fill every form element.");
    }

    const user = await UserModel.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          user_id: user._id,
        },
        process.env.TOKEN,
        { expiresIn: "3h" }
      );

      user.token = token;
      // console.log("login:::", token);

      res.status(200).json(user);
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (error) {
    console.log(error.message);
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
