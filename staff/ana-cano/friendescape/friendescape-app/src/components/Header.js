import React, { useState, useEffect, useContext } from 'react'
import './header.sass'
import Logo from './FriendEscape.png'


export default function ({user}) {
    
    return <>
   
    <figure className="header">
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
<p>Welcome {user}</p>
            <i className="fas fa-sign-out-alt"></i>
    </div>
   
    </>
}
