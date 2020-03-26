import React, { useEffect, useState } from 'react'
import './home.sass'
import Logo from './FriendEscape.png'
import Group from './group.jpg'


export default function ({ availableGroups, onHandleLogOut, onItemClick}) {
    
    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }
    
    return <>
    {/* Header */}
   <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
<p>Welcome name</p>
    <i className="fas fa-sign-out-alt" onClick={handleLogOut}></i>
    </div>
    </div>

<div className="availableGroups">
    <p>Escapes Room</p>
    <ul>
        {availableGroups.map(group => <Group key={group._id} item={group} onClick={onItemClick} />)}
    </ul>
</div>

    </>
}
