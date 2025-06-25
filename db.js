import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;






const userSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    userId:ObjectId,
    imageUrl:String
})
const adminSchema = new Schema({
    email:String,
    password:String,
    firstName:String,
    lastName:String
})
const purchaseSchema = new Schema({
  userId:ObjectId,
  courseId:ObjectId
  
})

const userModel = mongoose.model('user',userSchema)
const courseModel = mongoose.model('course',courseSchema)
const adminModel = mongoose.model('admin',adminSchema)
const puchaseModel = mongoose.model('purchase',purchaseSchema)

export {  userModel,courseModel,adminModel,puchaseModel};