import express from "express";
const Router = express.Router;


const courseRouter  =  Router();



courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "done",
  });
});
courseRouter.get("/preivew", function (req, res) {
  res.json({
    message: "done",
  });
});


export {courseRouter};