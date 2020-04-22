import React from 'react'
import '../sass/components/landing.sass'
import Logo from '../images/FriendEscape.png'



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

    <div className="landing__actions">
    {/* ADD class btn--main */}
    <a className="btn--main" href="" onClick = {handleGoToLogin}><i className="fas fa-user"></i>Login</a>
    <a className="btn--main" href="" onClick = {handleGoToRegister}><i className="fas fa-pencil-alt"></i>Register</a>
    </div>
    </section>
    </>
}
