const mongoose=require("mongoose");
let RatingSchema=new mongoose.Schema({
    student_name:String,
    email:String,
    contact:Number,
    rating:Number,
    messNos:String,
    feedback:String,
    messMaharaj:String,
    hostel:String,
    date:String
});
module.exports=mongoose.model("messratings",RatingSchema);