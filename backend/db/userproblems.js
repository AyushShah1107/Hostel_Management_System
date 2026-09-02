const mongoose=require("mongoose");
let problemSchema=new mongoose.Schema({
    username:String,
    useremail:String,
    userIdentity:String,
    problemTitle:String,
    receiverEmail:String,
    problemDescription:String,
    complainAgainst:String,
    againstName:String,
    againstEmailId:String,
    postingDate:String,
    status:String
});
module.exports=mongoose.model("userproblems",problemSchema);