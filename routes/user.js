import express from "express";
const Router = express.Router;
import  jwt  from "jsonwebtoken";
const JWT_USER_PASSWORD = "iammanan";
import { z } from "zod"
import bcrypt from "bcrypt"
const userRouter  =  Router();
import { userModel } from "../db.js";



userRouter.post("/signup", async function (req, res){

  const requiredBody = z.object({
    email:z.string().min(3).max(100).email(),
 firstName:z.string().min(3).max(10),
    lastName:z.string().min(3).max(10),
    password:z.string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter")
  .regex(/[0-9]/, "Password must include at least one number")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character")

   
  })
  const parsedDataWithSuccess = requiredBody.safeParse(req.body)
  if(!parsedDataWithSuccess.success){
    res.json({
      message:"incorrect format",
      error:parsedDataWithSuccess.error.format()
    })
    return
  }
  const { email, password, firstName,lastName } = parsedDataWithSuccess.data;
  const hashedPassword = await bcrypt.hash(password, 10); 
try{
  await userModel.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
  })
}catch(err){
    res.status(403).json({
      err
    })
}
 res.json({
    message: "Signup succeeded",
  });
})

userRouter.post("/signin",async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const response = await userModel.findOne({
    email: email,
  });
  if (!response) {
    res.status(403).json({
      message: "user does not exist in our db",
    });
    return;
  }
  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "incorrect",
    });
  }



});
userRouter.get("/purchases", function (req, res) {
  res.json({
    message: "done",
  });
});

export {userRouter};