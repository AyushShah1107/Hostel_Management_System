import React from "react";
import cls from '../CSSfiles/Footer.module.css'
import { GrInstagram,GrGithub } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Footer=()=>{
    let navigate=useNavigate();
    return(
        <div className={cls.footerMainDiv}>
            <div>E-mail : ujwalgupt@gmail.com</div>
            <div className={cls.Contact}>Contact : 000000000</div>
            <div className={cls.socialHandles}>
                <div><Link to={"https://instagram.com/ujjwalgupta8074?igshid=NzZlODBkYWE4Ng=="} target="_blanck"><GrInstagram  className={cls.handle}></GrInstagram></Link></div>
                <div><Link to={"https://github.com/ujjwal0414"} target="_blanck"><GrGithub  className={cls.handle}></GrGithub></Link></div>
            </div>
        </div>
    )
}
export {Footer}