import React, { useEffect } from 'react'
import '../sass/components/login.sass'
import Logo from '../images/FriendEscape.png'
import Feedback from './Feedback'

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
                <p>
                    <input id="username-input" className="login__input" name="email" type= "email" placeholder="Insert your email"/>
                    <label for="username-input" className="login__label">E-mail:</label>
                </p>
            </div>
            <div className="login__inputWrapper">
                <p>
                    <input id="password-input" className="login__input" name="password" type="password" placeholder="Insert your password" />
                    <label for="password-input" className="login__label">Password</label>
                </p>
            </div>
            <br></br>
            {error && <Feedback message={error} level="error"/>}

            <button className="btn--main" type="submit"><i className="fas fa-user"></i>Login</button>
            <button className="btn--main" onClick = {handleGoToRegister}><i className="fas fa-pencil-alt"></i>Register</button>
            
          </form>
       
    </section>
    </>

}
