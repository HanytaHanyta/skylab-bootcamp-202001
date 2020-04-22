import React from 'react'
import InfiniteCalendar from 'react-infinite-calendar'
import 'react-infinite-calendar/styles.css'

export default function ({handleDate}) {

    //let date
    var today = new Date()
    var nextMonths = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 90);

    return <>

<h3>SELECT A DATE</h3>    
     <InfiniteCalendar 
    width={400}
    height={300}
    min={today}
    max={nextMonths}
    onSelect={function(selectedDate) {
        handleDate(selectedDate)
     }}
     
  />

    </> 
}

