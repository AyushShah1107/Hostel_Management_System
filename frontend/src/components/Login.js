import React, { useState } from "react";
import { NavBar } from "./NavBar";
import cls from '../CSSfiles/Login.module.css'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
let localConnection=require("./localhostConfig");

let Login=()=>{
    let navigate=useNavigate();
    let [userName,setName]=useState("");
    let [pass,setPassword]=useState("");
    let [inputStatus,setStatus]=useState(false);
    let [loginStatus,setLogin]=useState(false);
    
    let logUser=async ()=>{
         if(userName==="" || pass===""){
            setStatus(true);
         }
         else{
            let response=await fetch(`${localConnection}/login`,{
                method:"post",
                body:JSON.stringify({
                    username:userName,
                    password:pass
                }),
                headers:{
                    "Content-Type":"application/json"
                }
              });
              response=await response.json();
              if(response.result){
                setLogin(false);
               localStorage.setItem("stduser",JSON.stringify({name:userName,email:response.email,branch:response.branch,year:response.year,fileName:response.filePic}));
              localStorage.setItem("forgotUser",JSON.stringify({name:userName,email:response.email}));
              
                navigate("/");
              }
              else{
  alert("Sorry unable to locate your data Either open this page in new tab or  Try again!!");

                setLogin(true);
                
                
              }
         }
    }
    
    return(
        <div>
            <NavBar></NavBar>
            <div className={cls.loginMainDiv}>
             <div className={cls.loginBox}>
                <div className={cls.userDetailsdiv}>
                    <div className={cls.label}>User Name</div>
                    <div><input value={userName}  onChange={(e)=>{setName(e.target.value)} } className={cls.userInput} type="text" placeholder="Enter User Name"/></div>
                    {inputStatus && userName===""? <div className={cls.emptyField}>Empty Field</div>:<></>}
                </div>
                <div className={cls.userDetailsdiv}>
                    <div className={cls.label}>Password</div>
                    <div><input value={pass} onChange={(e)=>{setPassword(e.target.value)}} className={cls.userInput} type="password" placeholder="Enter Password"/></div>
                    {inputStatus && pass===""? <div className={cls.emptyField}>Empty Field</div>:<></>}

                </div>
                <div className={cls.forgotDiv}><Link to="/forgotPassword">Forgot Password? </Link></div>
                {loginStatus? <div className={cls.unabletologin}>Sorry unable to Login</div>:<></>}
                <div className={cls.forgotDivbtn}><button onClick={logUser} className={cls.lognBtn}>Login</button></div>
             </div>
            </div>
        </div>
    )
}

export {Login}
