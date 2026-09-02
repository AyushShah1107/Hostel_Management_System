import React, { useState } from "react";
import { NavBar } from "./NavBar";
import cls from "../CSSfiles/forgotPassword.module.css"
import { useNavigate } from "react-router-dom";
let localConnection=require("./localhostConfig");

const ForgotPassword=()=>{
    let navigate=useNavigate();
    let [passwordMatch,setMatch]=useState(false);
    let [newPassEntry,setEntry]=useState(false);
    let [newPass,setNewPass]=useState("");
    let [confirmPass,setConfirmPass]=useState("");
    let [toShowDivMatch,setDivMatch]=useState(false);
    let [response,setResponse]=useState(null);
    let [changinsStatus,setstatus]=useState(false);
    let userInfo=JSON.parse(localStorage.getItem("forgotUser"));
    let usersname=userInfo.name;
    let userEmailId=userInfo.email;
   let changePass=async ()=>{
    setstatus(true);
    setDivMatch(true);
    if(newPass==""){
     setEntry(true);
    }
    else{
        setEntry(false);
        console.log(newPass,confirmPass);
    if(newPass!==confirmPass){
        setMatch(false);

    }
    else{
       setMatch(true);
       response=await fetch(`${localConnection}/changePassword/${usersname}/${userEmailId}`,{

        method:"put",
        body:JSON.stringify({password:confirmPass}),
        headers:{
            "Content-Type":"application/json"
        }
       }
       
       
       )
       
       response=await response.json();
       console.log(response);
       setResponse(response);

       setTimeout(()=>{
        

               navigate("/login");
       },2000)
    }
    }


   }
    return(
        <div>
            <NavBar></NavBar>
            <div className={cls.forgotMainDiv}>
                 <div className={cls.forgotBox}>
                    <div className={cls.inputDiv}>
                        <div className={cls.Label}>New Password</div>
                        <div className={cls.inputDivHere}><input className={cls.inputFIeld} value={newPass} onChange={(e)=>{setNewPass(e.target.value)}} type="text" placeholder="Enter New Password"/></div>
                       {newPassEntry && newPass==""? <div className={cls.nopassword}>Enter Password</div>:<></>}
                    </div>
                    <div className={cls.inputDiv}>
                        <div className={cls.Label}>Confirm Password</div>
                        <div className={cls.inputDivHere}><input className={cls.inputFIeld} value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}} type="text" placeholder="Enter Password Again"/></div>
                        {toShowDivMatch?<div>{passwordMatch?<div className={cls.matched}>Password matched</div>:<div className={cls.nomatch}>Password did not match</div>}</div>:<></>}
                        
                        
                    </div>
                    {changinsStatus?<><div className={cls.changingStatus}>{response?<div className={cls.matched}>Changed Password</div>: <div className={cls.nomatch}>Changing Password</div>}</div></>:<></>}
                    {/* <div className={cls.changingStatus}>
                        <div className={cls.nomatch}>Changing Password</div>
                        <div className={cls.matched}>Changed Password</div>
                    </div> */}
                    <div className={cls.changingDiv}><button onClick={changePass}>Change Password</button></div>
                 </div>
            </div>
        </div>
    )
}
export {ForgotPassword}
