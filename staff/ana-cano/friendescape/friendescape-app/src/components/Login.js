import React, { useEffect } from 'react'
import './login.sass'
import Logo from './FriendEscape.png'
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

        <form className="login__form" onSubmit = {handleSubmit}>
            <div className="login__inputWrapper">
                <i className="fas fa-envelope-open-text"></i>
                <input className= "login__input" id="username-input" name="email" type= "email" placeholder="Insert your email"/> E-mail: <br></br><br></br>  
            <br></br>
                {/* {errors && <p>{}</p> } */}
                <i className="fas fa-key"></i>
                <input  className= "login__input" id="password-input" name="password" type="password" placeholder="Insert your password"/> Password: <br></br> <br></br> 
            </div>
            <div className="login__buttons">
            <button type="submit" className="btn--main" >Login</button>
            <br></br><br></br>
            <a href="" onClick = {handleGoToRegister}>Register</a>     
            <br></br>
            </div>
        </form>
        {/* {error && <Feedback message={error} level="error"/>} */}
    </section>
    </>

}


























