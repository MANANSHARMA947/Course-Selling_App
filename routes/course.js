import express from "express";
const Router = express.Router;
import { courseModel, puchaseModel } from "../db.js";
import userMiddleware from "../middleware/user.js";

const courseRouter  =  Router();



courseRouter.post("/purchase",userMiddleware, async function (req, res){
  const userId = req.userId;
  const courseId = req.body.courseId;
await puchaseModel.create({
  userId,
  courseId
})
res.json({
  message:"purchased"
})

});
courseRouter.get("/preivew", async function (req, res) {
  const course= await courseModel.find({})
  res.json({
    course
  })
});


export {courseRouter};