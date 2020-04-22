import Moment from 'react-moment'
import React from 'react'
import '../sass/components/group.sass'



export default function ({ item, handleJoinGroup, handleLeaveGroup, handleDeleteGroup, error, user }) {
    
    const { id, date, time,  subevents, state, escapeRoom} = item
    
    let style = ""
    if(state === 'inactive') {
        style = "item__disabled"
    } else {
        subevents.length >= escapeRoom.minplayers ? style= "itemno" : style = "itemyes"
    }
  
    

     return <>
    <div className={style}>
        <li>
        <Moment className={style + '__date'} format="YYYY/MM/DD">{date}</Moment>
            <li>
            <h5>Title: {escapeRoom.title}</h5>
            
            <h5>Title: <span>{escapeRoom.title}</span></h5>
            <h5>Location: <span>{escapeRoom.location}</span></h5>
            <h5>Time: <span>{time}</span></h5>
            <h5>Punctuation: <span class={"</span>rating-five rating-five-" + escapeRoom.punctuation}></span></h5>
            <h5>Theme: <span>{escapeRoom.theme}</span></h5>
            <h5>Difficulty: <span class={"rating-three rating-three-" + escapeRoom.difficulty}></span></h5>
            <h5>Duration: <span>{escapeRoom.duration}</span></h5>
            <h5>Price: <span>{escapeRoom.price}</span></h5>
            <h5>State: <span>{state}</span></h5>
            <img className='results__img' src ={escapeRoom.img} alt="img escroom"/>
            <h5 className="join__integrantes"> Subevents: {subevents && subevents.map(subbed =>(<>
                <span> {subbed.name} {subbed.surname}</span>
                <br></br>
                <span className="join__trusty"> Trusty points: {subbed.trusty}</span>
                <br></br>
                <span className="join__foults"> Foults: {subbed.foults}</span>
                <br></br>
                <br></br>

            </>))}</h5>
            <h5>Min-Players: <span>{escapeRoom.minplayers}</span></h5>
            <h5>Max-Players: <span>{escapeRoom.maxplayers}</span></h5>
       </li>
            
         


        </li>
        </div>
    </>
}

