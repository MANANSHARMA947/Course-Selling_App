import express from "express";
const Router = express.Router;
import { adminModel , courseModel} from "../db.js";
import adminMiddleware from "../middleware/admin.js";
import jwt from "jsonwebtoken";
const JWT_ADMIN_PASSWORD = "iamadmin";
import { z } from "zod";
import bcrypt from "bcrypt";
const adminRouter = Router();

adminRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(100).email(),
    firstName: z.string().min(3).max(10),
    lastName: z.string().min(3).max(10),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must include at least one special character"
      ),
  });
  const parsedDataWithSuccess = requiredBody.safeParse(req.body);
  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "incorrect format",
      error: parsedDataWithSuccess.error.format(),
    });
    return;
  }
  const { email, password, firstName, lastName } = parsedDataWithSuccess.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await adminModel.create({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword,
    });
  } catch (err) {
    res.status(403).json({
      err,
    });
  }
  res.json({
    message: "Signup succeeded",
  });
});

adminRouter.post("/signin", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const response = await adminModel.findOne({
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
      JWT_ADMIN_PASSWORD
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

adminRouter.post("/course", adminMiddleware, function (req, res) {
  const adminId = req.userId;
  const {title,description,price,imageUrl,userId} = req.body;

courseModel.create({
  title,price,description,imageUrl,userId
})
res.json({
  message:"course created",
  courseId: course._id
})
});

adminRouter.put("/course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    // creating a web3 saas in 6 hours
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course/bulk", adminMiddleware,async function (req, res) {
  const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

export default adminRouter;
