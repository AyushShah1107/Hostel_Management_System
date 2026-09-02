import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import cls from "../CSSfiles/RateMess.module.css";
import ReactStars from 'react-rating-stars-component'
import { Footer } from "./Footer";
let localConnection=require("./localhostConfig");

let name=require('./hostelnames');
const RateFood=()=>{
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
    let [hostels,setHostels]=useState([]);
    let [hostelName,setHostelNames]=useState("");
    let [filteredboxstatus,setfilteredStatus]=useState(false);
    let [rates,setRate]=useState(0);
    let [messNos,setMessNosStatus]=useState(false);
    let [feedBack,setFeedback]=useState("");
    let [messNumberOrLetter,setMess]=useState("");
    let [messMaharaj,setMaharaj]=useState("");
    let [contactInfo,setContact]=useState(0);
    let [feedBackSubmission,setFeedBackStatus]=useState(false);
    let [response,setResponse]=useState({});
    let seeResult=(key)=>{
        setHostelNames(key);
        key=key.toLowerCase();
          
        let filteredArray=name.filter((item)=>item.includes(key));
        setHostels(filteredArray);
        if(key!==""){
            if(filteredArray.length!==0){
                setfilteredStatus(true);
            }
            else{
                setfilteredStatus(false);
            }

        }
        else{
            setfilteredStatus(false);
            setHostelNames("");
            setHostels(name);
            if(hostels.length===0){
                setfilteredStatus(false);
            }
        }

    }
    let setStars=(rating)=>{
        setRate(rating);
       

    }
    let  setnameHostel=(name)=>{
       setHostelNames(name);
       setfilteredStatus(false);

    }
    let setDataFeedback=async ()=>{
        
        let userDetails=JSON.parse(localStorage.getItem("stduser"));
        let userName=userDetails.name;
        let userEmail=userDetails.email;

    if(rates===0 || messNumberOrLetter==="" || hostelName===""){

        setMessNosStatus(true);
        return false;
    }
    else{
        setMessNosStatus(false);
        setFeedBackStatus(true);
        response=await fetch(`${localConnection}/rateMess`,{
            method:"post",
            body:JSON.stringify({
                student_name:userName,
                email:userEmail,
                contact:contactInfo,
                rating:rates,
                messNos:messNumberOrLetter,
                feedback:feedBack,
                messMaharaj:messMaharaj,
                hostel:hostelName,
                date:`${date}-${month}-${year}`
            }),
            headers:{
                "Content-Type":"application/json"
            }
        });
        response=await response.json();
        setResponse(response);
          
    }
    }
    useEffect(()=>{
       
    },[response])
    return(
        <div>
            <NavBar></NavBar>
            <div className={cls.descANDSearch}>
                <div className={cls.desc}>Hey {`user`} welcome to Mess Rating System . Here we assist you in helping your mess or food related issues , also you can place your views relaed to the food services and the quality of food being served. </div>
                <div className={cls.moto}>To serve you best is our MOTO</div>
                <div className={cls.searchOptions}><div><span className={cls.searchName}>Search</span><input value={hostelName} onChange={(e)=>{seeResult(e.target.value)}} className={cls.hostelInput} type="text" placeholder="Enter Hostel Name"/></div>
                {filteredboxstatus? <div className={cls.filteredHostelsnames}>{hostels.length>0?hostels.map((item,pos)=>{return(<div key={pos} onClick={()=>{setnameHostel(item)}} className={cls.names}>{item}</div>)}):<></>}</div>:<></>}
                
                </div>
            </div>
            <div className={cls.RatingDivs}>
                <div className={cls.feedbackStars}>
                <div className={cls.ratedStars}>You have rated {`${rates}`} stars</div>

                <div className={cls.stars}><ReactStars activeColor={"black"} isHalf={true} onChange={setStars} classNames={cls.starsRate}></ReactStars></div>
                    <div><textarea value={feedBack} onChange={(e)=>{setFeedback(e.target.value)}} placeholder="Enter your feedback if any" className={cls.feedbackContainer}></textarea></div>
                    
                </div>
                <div className={cls.details}>
                    <div className={cls.inputs_detail}>
                        <p className={cls.labels}>Mess Number : </p>
                        <div className={cls.inputDIv}><input value={messNumberOrLetter} onChange={(e)=>{setMess(e.target.value)}} className={cls.inputBox} type="text" placeholder="Enter Valid mess number"/></div>
                    {messNos?<> <p className={cls.errdetails}>Enter Valid Details either hostel name or no rating is there</p></>:<></>}
                    </div>
                    <div className={cls.inputs_detail}>
                        <p className={cls.labels}>Mess Maharaj : </p>
                        <div className={cls.inputDIv}><input value={messMaharaj} onChange={(e)=>{setMaharaj(e.target.value)}} className={cls.inputBox} type="text" placeholder="Mess Incharge name"/></div>
                    </div>
                    <div className={cls.inputs_detail}>
                        <p className={cls.labels}>Your Pesonal Contact Info : </p>
                        <div className={cls.inputDIv}><input value={contactInfo} onChange={(e)=>{setContact(e.target.value)}} className={cls.inputBox} type="number" placeholder="Enter your phone Number (optional)"/></div>
                    </div>
                    {feedBackSubmission?<><div className={cls.displayedbox}>{response.result===true?<span className={cls.feed}>FeedBack Submitted</span>:<span className={cls.submitting}>Submitting Feedback</span>}</div></>:<></>}
                    {/* <div className={cls.displayedbox}><span className={cls.feed}>FeedBack Submitted</span></div> */}
                    {/* <div className={cls.displayedbox}><span className={cls.submitting}>Submitting Feedback</span></div> */}
                    <div className={cls.submFeed}><button onClick={setDataFeedback} className={cls.submBtn}>Submit Feedback</button></div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}
export {RateFood}
