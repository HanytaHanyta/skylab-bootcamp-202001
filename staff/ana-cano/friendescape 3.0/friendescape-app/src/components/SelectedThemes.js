import React, { useEffect, useState} from 'react'
// import '../sass/components/home.sass'
import Logo from '../images/FriendEscape.png'
import Item from './Item'



export default function ({ onHandleGoHome, themeEscapes, onGoToDetail}) {


    function handleGoToHome(event){
        event.preventDefault()
        onHandleGoHome()
     }

return <>



<div className="escapesroom cards search">
    <h1 className= "cards__title">Escape Rooms</h1>
 <ul>
     {themeEscapes.map(escapeRoom => <Item key={escapeRoom._id} item={escapeRoom} onGoToDetail={onGoToDetail}/>)}
 </ul>
</div>

    </>
}
