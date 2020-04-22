import React, { useState } from 'react'
import '../sass/components/home.sass'
import Logo from '../images/FriendEscape.png'
import Group from './Group'


export default function ({ user, availableGroups, onHandleProfile, onHandleLogOut, onHandleGoHome, onItemClick, handleJoinGroup, handleDeleteGroup, handleLeaveGroup,  error}) {
    
    const {name} = user

    function handleProfile(event){
        event.preventDefault()
        onHandleProfile()
    }

    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }
    function handleGoToHome(event){
        event.preventDefault()
        onHandleGoHome()
     }

    return <>
    {/* Header */}
    <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
    <span>Welcome {name}</span>
    <i class="fas fa-cog" onClick={handleProfile}></i>
    <i className="fas fa-sign-out-alt" onClick={handleLogOut}></i>
    </div>
    </div>

        <div className="availableGroups">
        <a className="group__btn" onClick={handleGoToHome} ><i class="fas fa-undo-alt"></i>Go Back</a>
        <h1 className="cards__title">Available Groups</h1>
            <ul>
                {availableGroups.map(group => <Group item={group} user={user} onClick={onItemClick} handleJoinGroup={handleJoinGroup} handleDeleteGroup={handleDeleteGroup} handleLeaveGroup={handleLeaveGroup} error={error}/>)}
            </ul>
        </div>

    </>
}
