import React from 'react'
import './item.sass'



export default function ({ key, item}) {

    const {date, time, subevents, escapeRoom} = item

  

     return <>

        <li className="results--item item">

            <h4>Date: {date}</h4>
            <h5>Time: {time}</h5>
            <h5>Subevents: {subevents}</h5>
            <h5>Title: {escapeRoom.title}</h5>
            <h5>Min-Players: {escapeRoom.minplayers}</h5>
            <h5>Max-Players: {escapeRoom.maxplayers}</h5>
            {/* <h5>State : {state}</h5> */}
            
            
        </li>
    </>
}

