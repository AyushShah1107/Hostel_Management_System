import { NavBar } from "./NavBar";
import React, { useEffect, useState } from "react";
import { BsTrash3Fill } from "react-icons/bs";
import 'react-vertical-timeline-component/style.min.css';
import cls from "../CSSfiles/Complains.module.css"
import { VerticalTimeline,VerticalTimelineElement } from "react-vertical-timeline-component";
let probs=require("./ProblemsTImeline");
let localConnection=require("./localhostConfig");
const Complains=()=>{
    let [response,setResponses]=useState([]);
    let [ratingResponse,setRatingResponse]=useState([]);
    let userInfo=JSON.parse(localStorage.getItem("stduser"));
    let usersname=userInfo.name;
    let userEmailId=userInfo.email;
    let fetchAllcomplains=async ()=>{
        response =await fetch(`${localConnection}/fetchComplains/${usersname}/${userEmailId}`);
        response=await response.json();
        setResponses(response);
    }
    useEffect(()=>{
         fetchAllcomplains();
       
    },[])
let deleteComplain=async (description)=>{
     let response=await fetch(`${localConnection}/deleteComplain/${usersname}/${userEmailId}/${description}`,{
        method:"delete"
     })
     response=await response.json();
     fetchAllcomplains();
}
let fetchRatings=async()=>{
      ratingResponse=await fetch(`${localConnection}/messRatings/${usersname}/${userEmailId}`);
      ratingResponse=await ratingResponse.json();
      setRatingResponse(ratingResponse);

}
useEffect(()=>{
     fetchRatings();
},[])
    return(
       <div>
        <NavBar></NavBar>
        <div className={cls.MainDIVforLaptop}>
            <h2 className={cls.SEEPOSTS}>Hey user Lets see what Complains/Ratings you have</h2>
            <div className={cls.RatingsDiv}>
            

               {ratingResponse.length===0?<div className={cls.Norating}>You haven't Rated Yet</div>:ratingResponse.map((item,pos)=>{
                return(
                    <div className={cls.RatingCards} key={pos}>
                    <div className={cls.DescriptionRating}>Date Posted : <span className={cls.ratingAns}>{` ${item.date}`}</span></div>
                        <div className={cls.DescriptionRating}>Mess Rating : <span className={cls.ratingAns}>{`${item.rating}`}</span></div>
                        <div className={cls.DescriptionRating}>Hostel Name : <span className={cls.ratingAns}>{` ${item.hostel}`}</span></div>
                        <div className={cls.DescriptionRating}>Mess  : <span className={cls.ratingAns}>{` ${item.messNos}`}</span></div>
                    </div>
                )
               })}
            </div>
            <VerticalTimeline
            lineColor={ "black"}>
                {response.length===0?<>
                    <VerticalTimelineElement
                        
                        className={cls.verticalelements}
                        contentStyle={{ background: 'white',borderTop:`5px solid red` }}
                        contentArrowStyle={{ borderRight: '10px solid  white' }}
                        
                        dateClassName={ cls.datehere }
                        iconStyle={{ background: 'black', color: 'black',transform:"scale(0.3)" }}
    
                        >
                            <h3> <span> No problems Posted Yet</span> <span></span> </h3>
                            
                        </VerticalTimelineElement>

                </>:response.map((item,pos)=>{
                     let datedposted=`Date posted ${item.postingDate}`;
                    let colr="red";
                     let agaainstName=item.complainAgainst===""?"None":item.complainAgainst
                    if(item.status==="not pending")
                    {
                        colr="green";
                    }
                    else{
                        colr="red";
                    }
                    return(
                        <VerticalTimelineElement
                        key={pos}
                        className={cls.verticalelements}
                        contentStyle={{ background: 'white',borderTop:`5px solid ${colr}` }}
                        contentArrowStyle={{ borderRight: '10px solid  white' }}
                        date={datedposted}
                        dateClassName={ cls.datehere }
                        iconStyle={{ background: 'black', color: 'black',transform:"scale(0.3)" }}
    
                        >
                            <h3>{pos+1} . <span> {item.problemTitle} </span> <span>{` (Against : ${agaainstName})`}</span> <span className={cls.trash}><BsTrash3Fill onClick={()=>{deleteComplain(item.problemDescription)}} ></BsTrash3Fill></span></h3>
                            <p>{item.problemDescription}</p>
                            <p className={cls.statusDiv}><span className={cls.status}>Status :</span><span> {item.status}</span></p>
                        </VerticalTimelineElement>
                    )
                })}
            </VerticalTimeline>
        </div>
       </div>
    )
}
export {Complains}
