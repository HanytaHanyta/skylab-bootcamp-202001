import React from 'react'
import './home.sass'
import Logo from './FriendEscape.png'
import Group from './Group'


export default function ({ availableGroups, onHandleLogOut, onHandleGoBack, onItemClick}) {
    
    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }
    function handleGoBack(event){
        event.preventDefault()
        onHandleGoBack()

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
                <i class="fas fa-chevron-left" onClick={handleGoBack}></i>
            </ul>
        </div>

    </>
}
