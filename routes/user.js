import express from "express";
const Router = express.Router;


const userRouter  =  Router();
userRouter.post("/signup", function (req, res) {
  res.json({
    message: "done",
  });
});
userRouter.post("/signin", function (req, res) {
  res.json({
    message: "done",
  });
});
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "done",
  });
});

export {userRouter};