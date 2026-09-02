import React, { useState } from "react";
import { NavBar } from "./NavBar";
import cls from "../CSSfiles/ComplainForm.module.css"
import { Footer } from "./Footer";
let localConnection=require("./localhostConfig");

const ComplainForm=()=>{
    let [identity,setIdentityName]=useState("");
    let [problemTitle,setTitle]=useState("");
    let [receiverEmail,setReceiverEmail]=useState("");
    let [problemDescription,setDescription]=useState("");
    let[comaplainAgainst,setAgainst]=useState("");
    let [compalainAgainstname,setAgainstName]=useState("");
    let [emailAgainst,setEmailAgainst]=useState("");
    let [entryStatus,setEntryStatus]=useState(false);
    let [response,setResponse]=useState(null);
    let [submissionResponse,setSubmissionResponse]=useState(false);
    let userInfo=JSON.parse(localStorage.getItem("stduser"));
    let usersname=userInfo.name;
    let userEmailId=userInfo.email;
    let currentDay=new Date();

    let date=currentDay.getDate();
    date=date.toString();
    let month=currentDay.getMonth();
    if(month>12){
        month=1;
        month=month.toString();
    }
    else{
        month=month+1;
        month=month.toString();
    }
    let year=currentDay.getFullYear();
    year=year.toString();
    let submitProblem=async ()=>{
        
        if(problemTitle==="" || problemDescription===""  || identity===""){
            setEntryStatus(true);
            
           
        }
        else{
            setSubmissionResponse(true);
            response =await fetch(`${localConnection}/postproblem`,{
                method:"post",
                body:JSON.stringify({
                    username:usersname,
                    useremail:userEmailId,
                    userIdentity:identity,
                    problemTitle:problemTitle,
                    receiverEmail:receiverEmail,
                    problemDescription:problemDescription,
                    complainAgainst:comaplainAgainst,
                    againstName:compalainAgainstname,
                    againstEmailId:emailAgainst,
                    postingDate:`${date}-${month}-${year}`,
                    status:"pending"
                }),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            response=await response.json();
            if(response){
                setSubmissionResponse(true);
                setResponse(response);
                setTimeout(()=>{
                    setEntryStatus(false);
                    setSubmissionResponse(false);
                    setTitle("");
                    setDescription("");
                    setIdentityName("");
                    setEmailAgainst("");
                    setAgainstName("");
                    setAgainst("");
                    setReceiverEmail("");
                },6000)
            }
        }

    }
    let userName=JSON.parse(localStorage.getItem("stduser")).name

  
    return(
        <div>
            <NavBar/>
            
            <div className={cls.MainDiv}>
            <div className={cls.Identity}>
                <div className={cls.Choose}>Choose Identity : {`${identity}`}</div>
                <div onClick={()=>{setIdentityName("Anonymous")}} className={cls.choosingIdentityoption}>Anonymous</div>
                <div onClick={()=>{setIdentityName(userName)}} className={cls.choosingIdentityoption}>UserName</div>
            </div>
            
            <div className={cls.ComplainFormDiv}>
                <div className={cls.labelAndInput}>
                    <div className={cls.label}>Problem Titile</div>
                    <div className={cls.inputsField}><input value={problemTitle} onChange={(e)=>{setTitle(e.target.value)}} className={cls.input} type="text" placeholder=" e.g Hostel Problem , Academic Problem"/></div>
                    {entryStatus && problemTitle===""? <div className={cls.incompleteField}>Incomplete field check Identity and title too</div>:<></>}
                </div>
                <div className={cls.labelAndInput}>
                    <div className={cls.label}>Receiver's Email</div>
                    <div className={cls.inputsField}><input value={receiverEmail} onChange={(e)=>{setReceiverEmail(e.target.value)}} className={cls.input} type="email" placeholder=" Will be sent to the provided mailId (Optional)"/></div>
                </div>
                <div className={cls.labelAndInput}>
                    <div className={cls.label}>Problem Description</div>
                    <div className={cls.inputsField}><textarea value={problemDescription} onChange={(e)=>{setDescription(e.target.value)}} className={cls.problemDescription}  placeholder="Provide description of your problem"></textarea></div>
                    {entryStatus && problemDescription===""?  <div className={cls.incompleteField}>Empty Description</div>:<></>}
                </div>
            </div>
            <div className={cls.ComplainAgainst}>
            <div className={cls.labelAndInput}>
                    <div className={cls.label}>Complain Against (Optional)</div>
                    <div className={cls.inputsField}><input value={comaplainAgainst} className={cls.input} onChange={(e)=>{setAgainst(e.target.value)}} type="text" placeholder=" e.g Roomates , Batchmate"/></div>
                </div>
                <div className={cls.labelAndInput}>
                    <div className={cls.label}>Name</div>
                    <div className={cls.inputsField}><input className={cls.input} value={compalainAgainstname} onChange={(e)=>{setAgainstName(e.target.value)}} type="text" placeholder=" e.g Enter Name"/></div>
                </div>
                <div className={cls.labelAndInput}>
                    <div className={cls.label}>Email</div>
                    <div className={cls.inputsField}><input className={cls.input} value={emailAgainst}  onChange={(e)=>{setEmailAgainst(e.target.value)}} type="email" placeholder=" Email of person you are complaining against"/></div>
                </div>

            </div>
           {submissionResponse? <div className={cls.showSubmittingStatus}>{response?<div className={cls.sumitted}>Submitted Response ,Kindly check email for assurance (if not received please check network and email you registered with)</div>:<div className={cls.sumitting}>Submitting Response</div>} </div>:<></>}
            {/* <div className={cls.sumitting}>Submitting Response</div>
                <div className={cls.sumitted}>Submitted Response</div> */}
            <div className={cls.SubmitDiv}><button onClick={submitProblem}>Submit</button></div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export {ComplainForm}
