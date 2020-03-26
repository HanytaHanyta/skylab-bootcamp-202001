import React, { useEffect, useState } from 'react'
import './item.sass'



export default function ({ key, item, onHandleGoBack}) {

    const {date, time, subevents, created, state} = item

    function handleGoBack(event){
        event.preventDefault()
        onHandleGoBack()

    }

     return <>

        <li className="results--item item">

            <h4>Date: {date}</h4>
            <h5>Time: {time}</h5>
            <h5>Subevents: {subevents}</h5>
            <h5>Created: {created}</h5>
            <h5>State : {state}</h5>
            <i class="fas fa-chevron-left" onClick={handleGoBack}></i>
            
        </li>
    </>
}

