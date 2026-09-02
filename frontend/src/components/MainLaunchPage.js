import React from "react";
import { NavBar } from "./NavBar";
import cls from "../CSSfiles/LaunchPage.module.css"
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
const LaunchPage=()=>{
    
    let navigate=useNavigate();
    let redirectToRateMess=()=>{
        navigate("/ratemessfood");

    }
    let redirectToComplainForm=()=>{
        navigate("/complainform");
    }
    return(
        
        <div>
            <NavBar></NavBar>
            <div className={cls.launcherMainDiv}>
                <div className={cls.descriptionDiv}>
                    <p>Dear User,</p>
                    <p>This website has been created keeping in mind the various issues a student faces during their stay in Campus .</p>
                    <p>This web service helps to lodge complainsa againt the indivdual or any hostel or academic related propblems here by being anonymous</p>
                </div>
                <div className={cls.cardsContainer}>
                <div className={cls.CardDiv}><div className={cls.imageHolder}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDXlu35C_h7-1evZ2Xm8syVoT-8xwKltov0yBOHm07P5QyeKfh6OUCf9B5iqyw0Om4s7U&usqp=CAU" alt="pix"/></div>
                <div className={cls.ratefoodDesc}>Very few individuals like the mess food and the reason may be any.It can be due to hygiene issue,bad taste,quality of raw materials used and many.But we can't rely on the the food delivery apps always,Rather we are responsibl for what is being served to us and complain if any issues found. </div>
                <div className={cls.rateBtn}>
                    <button onClick={redirectToRateMess}>Rate Now !</button>
                </div>
                </div>
                
                <div className={cls.CardDiv}><div className={cls.imageHolder}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt1Ab7eeB_5nDD35waXoG7MpjDjpYCacrKFg&usqp=CAU" alt="pix"/></div>
                
                <div className={cls.ratefoodDesc}>As a student major population resides in hostels and where they have to manage with daily unforseen ,unexpected circumstances and it might be possible that they are not able to report at the current moment or do not want to disclose identity .But with our assistance they can surely get help!</div>
                <div className={cls.rateBtn}>
                    <button onClick={redirectToComplainForm}>Complain</button>
                </div>
                </div>
                

                {/*component for chat app */}
                <div className={cls.CardDiv}><div className={cls.imageHolder}><img src="https://thinkthyme.com/wp-content/uploads/2017/12/10-Group-Chat-Tools-for-Small-Companies.jpg" alt="pix"/></div>
                
                <div className={cls.ratefoodDesc}>Join the community where you will be updated with many upcoming events ,where you will be able to post your queries and get actionable answers from your batchmates . Not only getiing updated but current updates on ongoing campus chores which might help you to contribute your skills to the part which might be missing !.</div>
                <div className={cls.rateBtn}>
                    <button onClick={()=>{navigate("/community")}}>Join Community</button>
                </div>
                </div>
                {/*chata app component ends here */}


                
                </div>
             
            </div>
            <Footer></Footer>
        </div>
    )
}
export {LaunchPage}
