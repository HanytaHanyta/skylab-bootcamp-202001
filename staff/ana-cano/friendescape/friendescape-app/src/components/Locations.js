import React, { useEffect, useState } from 'react'
// import './home.sass'
import { withRouter } from 'react-router-dom'
import Logo from './FriendEscape.png'
import Item from './Item'


export default function ({user, onGoToBack}) {
    const {name} = user


    function handleGoBack(event) {
        event.preventDefault()

        onGoToBack()
    }

    
    return <>
    {/* Header */}
   <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
<p>Welcome {name}</p>
    <i className="fas fa-sign-out-alt"></i>
    </div>
    </div>

{/* Search */}
<div className={availableEscape ? "escapesroom search" : "escapesroom query"}>
    <p>Escapes Room</p>
    <ul>
        {availableEscape.map(escape => <Item key={escape._id} item={escape} onClick={onItemClick} />)}
    </ul>
</div>
<button onClick={handleGoBack}>Go back</button>
    </>
}
