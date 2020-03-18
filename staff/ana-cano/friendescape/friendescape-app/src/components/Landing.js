import React from 'react'
import './landing.sass'
import Logo from './FriendEscape.png'



export default function ({ onGoToRegister, onGoToLogin, error }) {

    function handleGoToRegister(event) {
        event.preventDefault()

        onGoToRegister()
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <>

    <section className="landing">

    <header className="landing__header">
        <h1 className="landing__title"> Do you dare to be part of our community?</h1>
    </header>

    <figure className="landing__figure">
        <img className='landing__image' src ={Logo} alt="Logo"/>
    </figure>

    <a href="" onClick = {handleGoToLogin}>Login</a> 
    <a href="" onClick = {handleGoToRegister}>Register</a>  

    </section>
    </>
}
