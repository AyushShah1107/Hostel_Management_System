require("dotenv").config({
    path:"./.env"
    
}
)
console.log(process.env.MONGO_URI)
const express=require("express");
const multer=require("multer");
const fs=require("fs");
const path=require("path");
const app=express();
require("./db/config");
const mailer=require("./sendmail");
let user=require("./db/user")
app.use(express.json());
const cor=require("cors");
const problem=require("./db/userproblems");
let subj="<h3>Dear User</h3><br><h3>Being a responsible student you have the responsibilty of improving the beautiful campus and improving the facilities provided by it and you have the full right to complain against any services you find inconvenient , so lets move forward and create a change .</h3>"
const problemAcceptanceMail=require("./problemAcceptancsMail");
const messRating=require("./db/messRating");
const problemSolverMail=require("./problemSolverMail");
const userProf=require("./db/userProfilePic");
let uniqueNameForFIle="";
let uniqueNameEmailforFile="";
app.use("/files",express.static("files"));
app.use(cor());
//testing api
app.get("/",(req,resp)=>{
    resp.send("Launching api");
})
//testing api ends here

//signupApi
app.post("/signup", async (req,resp)=>{
      let data=new user(req.body);
      let response=await data.save();
      uniqueNameForFIle=response.username
      uniqueNameEmailforFile=response.email;
      if(response){
        resp.send(response);
        mailer(subj,`Congratulations ${response.username} ! You have been Logged in , enjoy our services`,`uJEX Webservices`,response.email)
      }
});
//signup api ends here

//i am making an api for user profile pic here
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./files")
    },
    filename:(req,file,cb)=>{
        
        cb(null,uniqueNameForFIle+"@"+uniqueNameEmailforFile+file.originalname);
    }
});
const upload=multer({storage:storage});
app.post("/uploadProfilePic/:userName/:userEmail",upload.single("file"),async (req,resp)=>{
    let fileName=req.file.filename;
    let username=req.params.userName;
    let useremail=req.params.userEmail;
    let response=new userProf({UserfileName:fileName,userNameprofile:username,userEmailprofile:useremail});
    let data=await response.save();
    console.log(data);
    resp.send(data);
})
//api for profilepic ends here


//if user tries to update his/her profile pic this api works


//in same api block i am deleting the  file



//updation pic api end  here




//login api
app.post("/login", async (req,resp)=>{
    let searched_data=await user.findOne(req.body);
    
    if(searched_data ){
        let profileSearch=await userProf.findOne({
        userNameprofile:searched_data.username,
        userEmailprofile:searched_data.email});
        resp.send({result:true,name:searched_data.username,email:searched_data.email,filePic:profileSearch.UserfileName,branch:searched_data.branch,year:searched_data.yearofstudy});
     }
    else{
        resp.send({result:false});
    }
});
//login api ends here

//messrating api
app.post("/rateMess", async (req,resp)=>{
    let response=new messRating(req.body);
    let result=await response.save();
   if(result){
    resp.send({result:true});
   }
   else{
    resp.send({result:false});
   }
})
//messrating api ends here



//userProblem posting api 
app.post("/postproblem",async (req,resp)=>{
   let response=new problem(req.body);
   let result=await response.save();
  resp.send(result);
   let userEmailSender=result.useremail;
   if(result.receiverEmail!==""){
   if(result.userIdentity==="Anonymous"){
    let SubjectTitle="Confirmation of receiving your problem Status";
    let webServiceProvider=`uJEX Webservices`;
    let receiverEMail=result.receiverEmail;
    
    let Body="<h3>Dear User ,</h3><br><h3>We consider your problem as ours and assure your anonimity to be kept secret to us only , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>"
       let problemsolverBody="<h3>Dear Sir/Mam ,</h3><br><h3>Hope this mailfinds you well. A user has recently posted a problem and has requested you to look into the matter kindly get the info in your dashboard</h3><br><h3>WIth best regards</h3><br><h3>ujEX webservices</h3>"
       let problemsolver_title="A user has recently posted a problem";
       problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       problemSolverMail(problemsolverBody,problemsolver_title,webServiceProvider,receiverEMail);
   }
   else{
    let SubjectTitle="Confirmation of receiving your problem Status";
    let webServiceProvider=`uJEX Webservices`;
    let receiverEMail=result.receiverEmail;
    let userNameSender=result.username;
    let problemsolverBody="<h3>Dear Sir/Mam ,</h3><br><h3>Hope this mailfinds you well. A user has recently posted a problem and has requested you to look into the matter kindly get the info in your dashboard</h3><br><h3>WIth best regards</h3><br><h3>ujEX webservices</h3>"
    let problemsolver_title=`${userNameSender} has recently posted a problem`;
    let Body=`<h3>Dear ${userNameSender} ,</h3><br><h3>We consider your problem as ours , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>`
       problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       problemSolverMail(problemsolverBody,problemsolver_title,webServiceProvider,receiverEMail);

   }
   }
   else{
    if(result.userIdentity==="Anonymous"){
        let SubjectTitle="Confirmation of receiving your problem Status";
        let webServiceProvider=`uJEX Webservices`;
       
        
        let Body="<h3>Dear User ,</h3><br><h3>We consider your problem as ours and assure your anonimity to be kept secret to us only , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>"
           problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       }
       else{
        let SubjectTitle="Confirmation of receiving your problem Status";
        let webServiceProvider=`uJEX Webservices`;
        
        let userNameSender=result.username;
        let Body=`<h3>Dear ${userNameSender} ,</h3><br><h3>We consider your problem as ours , this mail is being sent to assure you that we have received your problem status and hope to contact you soon.</h3><br><h3>WIth best Regard</h3><h3>Team ujex</h3>`
           problemAcceptanceMail(Body,SubjectTitle,webServiceProvider,userEmailSender);
       }
   }
})
//problem posting api ends here





//to fetch all usercomplains here 
app.get("/fetchComplains/:userName/:userEmail",async (req,resp)=>{
    let data=await problem.find({username:req.params.userName,useremail:req.params.userEmail});
    resp.send(data);


})
//user problem fetch api ends here




//complain delete api
app.delete("/deleteComplain/:userName/:userEmail/:problemDescription",async (req,resp)=>{
    let response=await problem.deleteOne({username:req.params.userName,useremail:req.params.userEmail,problemDescription:req.params.problemDescription});
    resp.send(response);
})
//complain api ends here



//to get user ratings api
app.get("/messRatings/:username/:email",async (req,resp)=>{
    let data=await messRating.find({student_name:req.params.username,email:req.params.email});
    resp.send(data);
})
////user mess ratings ends here


//password changing api
app.put("/changePassword/:username/:userEmail",async (req,resp)=>{
    let response=await user.updateOne({username:req.params.username,email:req.params.userEmail},{
        $set:{password:req.body.password}
    })
    resp.send(response)
})
//password changing api ends here





app.listen(5000);
