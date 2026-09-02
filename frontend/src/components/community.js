import React,{useState,useEffect} from "react";
import cls from "../CSSfiles/Community.module.css"
import { FaUser,FaUserCircle,FaArrowAltCircleRight,FaArrowAltCircleLeft } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { HiMiniUserCircle } from "react-icons/hi2";
const Community=()=>{
    let [commStatus,setCommunityStatus]=useState(false);
   // let [messageBoxStatus,setMessBoxStatus]=useState(false);
    let MessBoxClass=[cls.MessboxContainer];
    let ClassForCommunityTab=[];
    let messSt=[];
     let CommunityTabClass=[cls.Communities];
      ClassForCommunityTab=commStatus?CommunityTabClass.push(cls.shiftLeftClassforCommunityTab):CommunityTabClass
  messSt=  commStatus?MessBoxClass.push(cls.shiftClassforMessageBox):MessBoxClass;
  useEffect(()=>{
    console.log("ready to join");
    return ()=>{
        console.log("Ready to disconnect");
    }
  },[])
    return(
        <div className={cls.mainPageContainer}>
            <div className={cls.communityBox}>
                <div className={cls.communityTitle}>
                    <div className={cls.title}>Community Posts</div>
                    <div className={cls.avatarandUser}>
                        <div className={cls.avatar}>Avatar <FaUserCircle className={cls.avat} /></div>
                        <div className={cls.seeOnlineUsers}><FaUser></FaUser></div>
                    </div>
                </div>
                <div className={cls.communitiesAndMessBox}>
                    {/* You need to shift bbelow div as a whole */}
                    <div className={CommunityTabClass.join(" ")}>

                        <div className={cls.allCommunitiesTitle}>
                            <div className={cls.TitleForComm}>Active Communities</div>
                            <div className={cls.Arrowleft}><FaArrowAltCircleRight onClick={()=>{setCommunityStatus(!commStatus)}} /></div>
                           
                        </div>
                        <div className={cls.ListOfCommunities}>
                            <div className={cls.CommNameContainer}>
                                 <div className={cls.Logo}><HiMiniUserCircle className={cls.UserLogo}></HiMiniUserCircle></div>
                                 <div className={cls.NameCommunityWithLastSeenMess}>
                                    <p className={cls.boldName}>uJEX Community</p>
                                    <p className={cls.LastMessSeen}>Last message to be here with ext</p>
                                 </div>
                                 <div className={cls.newMess}>New Mess</div>
                            </div>
                            <div className={cls.CommNameContainer}>
                                 <div className={cls.Logo}><HiMiniUserCircle className={cls.UserLogo}></HiMiniUserCircle></div>
                                 <div className={cls.NameCommunityWithLastSeenMess}>
                                    <p className={cls.boldName}>uJEX Community</p>
                                    <p className={cls.LastMessSeen}>Last message to be here with ext</p>
                                 </div>
                                 <div className={cls.newMess}>New Mess</div>
                            </div>


                        </div>
                    </div>
                     {/* upto this you need to shift */}
                    <div className={MessBoxClass.join(" ")}>
                        <div className={cls.BackbtnAndTitleOFCurrentCommunityBeingSeen}>
                            <div className={cls.Back}><FaArrowAltCircleLeft onClick={()=>{setCommunityStatus(!commStatus)}} /></div>
                            <div className={cls.CurrentCommunityTitle}>Title of Community</div>
                        </div>
                        <div className={cls.MessageDiv}>
                            {/* personal messages here */}
                            <div className={cls.personalMess}>
                                <div>
                                    
                                    <div className={cls.userNameInfo}>userName</div>
                                </div>
                                <p className={cls.UserPersonalMess}>Hey there ! This page is still under development mode and stil some implementations are to be made ,sorry for any incoveniences hope to deploy in production mode soon :-)</p>
                                <p className={cls.timingSent}>11:45</p>
                            </div>
                            
                            
                            {/* personal message ends here */}
                            {/* Others messages are here */}

                            <div className={cls.OtherMess}>
                                <div>
                                    <div className={cls.otherUserName}>userName</div>
                                </div>
                                <p className={cls.OthersUserMess}>
                                    Other chats goes here...
                                </p>
                                <p className={cls.otherUserTiming}>11:45</p>
                            </div>
                            
                            {/* others mess ends here the div part */}
                        </div>
                        <div className={cls.InputBoxAndSender}>
                            <div className={cls.InputDiv}><input className={cls.InputBox} type="text" placeholder="Enter Message" /></div>
                            <div className={cls.SendDiv}><IoIosSend className={cls.SendBtn}></IoIosSend></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export {Community}
