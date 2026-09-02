import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import cls from '../CSSfiles/NavBar.module.css';
import { HiX } from "react-icons/hi";
let localConnection=require("./localhostConfig");

const NavBar=()=>{
    let navigate=useNavigate()
    let logoutUser=()=>{
        localStorage.removeItem("stduser");
        navigate("/signup");
    }
    let [showCount,setCount]=useState(1);
    let [navigators,setStatus]=useState(true);
    let [showProfilecount,setProfileCOunt]=useState(1);
    let [showProfileStatus,setProfileStatus]=useState(true);
    let setFileSelect=useRef("");
    let [userInfoname,setInfoname]=useState("");
    let [userEmailInfo,setInfoEmail]=useState("");
    let [branchInfo,setbranchInfo]=useState("");
    let [yearInfo,setInfoyear]=useState(null);
    let [file,setFile]=useState("");
   
    let [profilepicture,setPicture]=useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
  
     let auth=localStorage.getItem("stduser");
     let user=localStorage.getItem("stduser");
     user=JSON.parse(user);
   
     
    useEffect(()=>{
        if(auth || user){
          
    setInfoname(user.name);
    setInfoEmail(user.email);
    setbranchInfo(user.branch);
    setInfoyear(user.year);
            if(user.fileName!==""){
                setPicture(`${localConnection}/files/${user.fileName}`)
              }
              else{
                 setPicture(`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png`);
              }
        }

    },[profilepicture,auth])
   
    let toShowNavigators=()=>{
    setCount(showCount+1);
   
      showCount%2===0?setStatus(true):setStatus(false)
    }
    let seeProfile=()=>{
       setProfileCOunt(showProfilecount+1);
       showProfilecount%2===0?setProfileStatus(true):setProfileStatus(false);

    }
    let handleChange=async ()=>{
        //
       

    }
  
    return(
        <div className={cls.NAVbarDiv}>
           <div className={cls.logo}><span>u</span><span className={cls.jex}>JEX</span></div>
           <span onClick={()=>{toShowNavigators()}} className={cls.threeBar}>&#8801;</span>

           <div className={cls.noUserSignPageOnwindow}>
            {auth?<> <div className={cls.signupDiv}><Link to="/">Home</Link></div>
            <div className={cls.signupDiv}><Link to="/complains">Complains</Link></div>
            <div className={`${cls.signupDiv} `}><div onClick={seeProfile} className={ `${cls.profile}`}>Profile</div>
            {showProfileStatus?<></>:<div className={cls.userProfileDiv}>
                <div className={cls.userPrfilePhotoandName}>
                     <div className={cls.profilepic}>
                        <div className={cls.profilepicContainer}>
                        <img className={cls.imagePic} src={profilepicture} alt="profilepic"/>
                        </div>
                        <div  className={cls.profilepicUpdateDiv}>
                            <input onChange={(e)=>{setFile(e.target.files[0])}} ref={setFileSelect} className={cls.fileSelect} type="file"/>
                            <button onClick={handleChange}>Update</button></div>
                     </div>
                     <div className={cls.profilename}>
                    <p className={cls.Username}>Hello ! {userInfoname}</p>
                    <p className={cls.emailUser}>Email : {userEmailInfo}</p>
                </div>
                </div>
                <div className={cls.userExtraThing}><span className={cls.statusUser}>Branch : </span> {branchInfo} </div>
                <div className={cls.userExtraThing}><span className={cls.statusUser}>Year of Study : </span> {yearInfo} </div>

                </div>}
            </div>
            <div className={cls.signupDiv}><button className={cls.logoutbtn} onClick={logoutUser}>Logout</button></div>

           </>:<> <div className={cls.signupDiv}><Link to="/signup">Sign Up</Link></div>
            <div ><Link to="/login">Login</Link></div></>}
           </div>


           {navigators?<></>:<><div className={cls.noUserSignPage}>
            {auth?<> <div className={cls.signupDiv}><Link to="/">Home</Link></div>
            <div className={cls.signupDiv}><Link to="/complains">Complains</Link></div>
            <div className={`${cls.signupDiv}`}><div onClick={seeProfile} className={ `${cls.profile}`}>Profile</div>
            {showProfileStatus?<></>:<div className={cls.userProfileDiv}>
            <div className={cls.userPrfilePhotoandName}>
                <div className={cls.xmarkspan}><HiX onClick={seeProfile} className={cls.xmark}></HiX></div>
                <div className={cls.profilepic}>
                <div className={cls.profilepicContainer}>
                  <img  className={cls.imagePic} src={profilepicture} alt="profilepic"/>
                </div>
                        <div className={cls.profilepicUpdateDiv}>
                        <input onChange={(e)=>{setFile(e.target.files[0])}} ref={setFileSelect} className={cls.fileSelect} type="file"/>
 
                            <button onClick={handleChange}>Update</button>
                        </div>
                </div>
                <div className={cls.profilename}>
                    <p className={cls.Username}>Hello ! {userInfoname}</p>
                    <p className={cls.emailUser}>Email : {userEmailInfo}</p>
                </div>
            </div>
               
                <div className={cls.userExtraThing}><span className={cls.statusUser}>Branch : </span>{branchInfo} </div>
                <div className={cls.userExtraThing}><span className={cls.statusUser}>Year of Study : </span>{yearInfo} </div>

                </div>}
            
            </div>
            <div className={cls.signupDiv}><button className={cls.logoutbtn} onClick={logoutUser}>Logout</button></div>

           </>:<> <div className={cls.signupDiv}><Link to="/signup">Sign Up</Link></div>

            <div ><Link to="/login">Login</Link></div></>}
           
           

           </div></>}
        </div>
    )
}
export {NavBar}
