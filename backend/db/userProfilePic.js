const mongoose=require("mongoose");
let userProfilePic=new mongoose.Schema({
    UserfileName:String,
    userNameprofile:String,
    userEmailprofile:String
});
module.exports=mongoose.model("userprofile",userProfilePic);
