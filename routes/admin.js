import express from "express";
const Router = express.Router;
import { adminModel } from "../db.js";
const adminRouter = Router();

adminRouter.post("/signup", function (req, res) {
  res.json({
    message: "done",
  });
});
adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "done",
  });
});

adminRouter.post("/", function (req, res) {
  res.json({
    message: "done",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "done",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "done",
  });
});

export default adminRouter;
