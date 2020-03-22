import React, { useEffect } from 'react'
import './login.sass'
import Logo from './FriendEscape.png'
import Feedback from './Feedback'

export default function ({}) {
  
return <>

    <div className="main">

<nav class='main__nav'>
<i class="fas fa-bars"></i>
<input type="text"/>
<i class="fas fa-search"></i>   
</nav>

<section className='main__groups'>
    <span> Do you want to live one adventure but you don't know who will be as brave as you? <br/>
    Join one of our groups or create a new one and... Show must go on!!</span>
    <button> Join one of our groups</button>
    <button> Create a Group </button>
    <img src='group.jpg'/>
</section>

</div>
</>

}

