import React, { useEffect } from 'react'
import './register.sass'
// import Feedback from './Feedback'
import Logo from './FriendEscape.png'

export default function ({ onSubmit, onGoToLogin, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
            telf: { value: telf},
            password: { value: password }
        } } = event

        onSubmit(name, surname, email, telf, password)
    }

    function handleGoToLogin(event) {
        event.preventDefault()

        onGoToLogin()
    }

    return <section className="register">

        <header className="register__header">
            <h1 className="register__title"> Be part of our team</h1>
        </header>

        <figure className="register__figure">
        <img className='register__image' src ={Logo} alt="Logo"/>
        </figure>
        
        <form className="register__form" onSubmit={handleSubmit}>
       
        <div className="register__inputWrapper">
            <i class="far fa-user-circle"></i>
            <input id="name-input" className="register__input" type="text" name="name" placeholder="Insert your name"/>
            <label for="name-input" className="register__label">Name: </label>
        </div>

        <div className="register__inputWrapper">
            <input id="surname-input" className="register__input" type="text" name="surname" placeholder="Insert your surname"/>
            <label for="surname-input" className="register__label"> Surname: </label>
        </div>

        <div className="register__inputWrapper">
            <input id="email-input" className="register__input" type="text" name="email" placeholder="Insert your email"/>
            <label for="email-input" className="register__label"> Email: </label>
        </div>

        <div className="register__inputWrapper">
            <input id="telf-input" className="register__input" type="text" name="name" placeholder="Insert your tele"/>
            <label for="telf-input" className="register__label">Telep: </label>
        </div>

        <div className="register__inputWrapper">
            <input id="password-input" className="register__input" type="text" name="password" placeholder="Insert your password"/>
            <label for="password-input" className="register__label"> Password: </label>
        </div>

        <button type="button" className="btn--main" >Register</button>
        <a href="" onClick = {handleGoToLogin}>Login</a>  
            
        </form>
        {/* {error && <Feedback message={error} level="warn" />} */}
    </section>
}