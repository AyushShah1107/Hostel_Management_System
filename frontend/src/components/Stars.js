import React from "react";
import ReactStars from 'react-rating-stars-component'
import cls from "../CSSfiles/Stars.module.css"
const Stars=()=>{
    let giveRating=(rating)=>{
         alert(`youva have rated ${rating} stars`);
    }
    return(
        <div className={cls.starsDiv}>
          <ReactStars classNames={cls.stars} onChange={giveRating} isHalf={true}/>
        </div>
    )
}
export {Stars}