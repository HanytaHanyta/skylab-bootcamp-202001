import React, { useEffect } from 'react'
import '../sass/components/login.sass'

import Logo from '../images/FriendEscape.png'
// import Feedback from './Feedback'





export default function ({ onSubmit, onGoToRegister, error, onMount }) {
    useEffect(() => {
        onMount()
    }, [])

    function handleSubmit(event) {
        event.preventDefault()

        const { target: {
            email: { value: email },
            password: { value: password }
        } } = event
        onSubmit(email, password)
    }

    function handleGoToRegister(event) {
        event.preventDefault()
        onGoToRegister()
    }


    return <>
    <section className="login">
        <header className="login__header">
            <h1 className="login__title">Welcome again</h1>
        </header>

        <figure className="login__figure">
            <img className='login__image' src ={Logo} alt="Logo"/>
        </figure>

        <form action="login__form" onSubmit = {handleSubmit}>
            <div className="login__inputWrapper">
                <input id="username-input" className="login__input" name="email" type= "email" placeholder="Insert your email"/>
                <label for="username-input" className="login__label">E-mail:</label>

            </div>
            <div class="login__inputWrapper">
                <input id="password-input" className="login__input" name="password" type="password" placeholder="Insert your password" />
                <label for="password-input" className="login__label">Password</label>
            </div>

            <button className="btn--main" type="submit">Login</button>

            <button className="btn--main" onClick = {handleGoToRegister}>Register</button>

          </form>
        {/* {error && <Feedback message={error} level="error"/>} */}
    </section>
    </>

}
