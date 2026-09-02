const mongoose=require("mongoose");
let userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    branch:String,
    yearofstudy:Number
})
module.exports=mongoose.model("users",userSchema)
