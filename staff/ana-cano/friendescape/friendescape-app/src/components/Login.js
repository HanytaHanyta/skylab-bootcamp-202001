import React, { useState } from 'react'
import './login.sass'
import Logo from './FriendEscape.png'
import 'font-awesome/css/font-awesome.min.css'


export default function ({ onSubmit, onGoToRegister, error, onMount }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState(null)


    function handleSubmit(event) {
        event.preventDefault()
        // if (email === '') {
        //     setErrors({error: 'email can\'t be empty'})
        // }
        // if (password === '') {
        //     setErrors({error: 'password can\'t be empty'})
        // }

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

        <form className="login__form" onSubmit = {handleSubmit}>
            <div className="login__inputWrapper">
            <i class="fas fa-envelope-open-text"></i>
            <input id="username-input" className="login__input" onChange={e => setEmail(e.target.value)} type="text" name="email" placeholder="Insert your email"/>
                <label for="username-input" className="login__label">E-mail: </label>
            </div>
                {errors && <p>{}</p> }
            <div className="login__inputWrapper">
            <i class="fas fa-key"></i>
                <input id="password-input" className="login__input" onChange={e => setPassword(e.target.value)} type="password" placeholder="Insert your password" />
                <label for="password-input" class="login__label">Password</label>
            </div>
                
            <button type="button" className="btn--main" >Login</button>
            <a href="" onClick = {handleGoToRegister}>Register</a>     
       
        </form>

    </section>
    </>
}
