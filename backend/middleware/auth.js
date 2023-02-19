import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import { UserModel } from "../models/users.js";

dotenv.config();

const verifyToken = async (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");
  // console.log("auth:::", token);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.TOKEN, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Token is not valid" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};

export { verifyToken };

// const token =
//     req.body.token || req.query.token || req.header["x-access-token"];

//   if (!token) {
//     return res.status(403).json({ msg: "No token, authorization denied" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.TOKEN);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).send("Invalid Token from middleware");
//   }
//   return next();

// let token;

// if (
//   req.headers.authorization &&
//   req.headers.authorization.startsWith("Bearer")
// ) {
//   try {
//     // Get token from header
//     token = req.headers.authorization.split(" ");

//     //   Verify token
//     const decoded = jwt.verify(token, process.env.TOKEN);

//     //   Get user from the token
//     req.user = await UserModel.findById(decoded.user_id).select("-password");
//     console.log(token);
//     next();
//   } catch (err) {
//     console.log("error from auth middleware:::", err);
//     res.status(401);
//   }
// }
