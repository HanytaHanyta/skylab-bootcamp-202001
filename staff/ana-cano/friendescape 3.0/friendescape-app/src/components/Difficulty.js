import React, { useState } from 'react'
import '../sass/components/difficulty.sass'
import Logo from '../images/FriendEscape.png'
import Easy from '../images/easy.jpg'
import Medium from '../images/medium.jpg'
import Hard from '../images/hard.jpg'


export default function ({user, onHandleEasy, onHandleMedium, onHandleHard, onHandleLogOut,  onHandleProfile, onHandleGoHome}) {
    const {name} = user
    const [difficulty, setDifficulty] = useState(true)


    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }

    function handleGoToHome(event){
        event.preventDefault()
        onHandleGoHome()
     }

    function handleEasy(event){
        event.preventDefault()
        setDifficulty(false)
        onHandleEasy()
    }
    function handleMedium(event){
        event.preventDefault()
        setDifficulty(false)
        onHandleMedium()
    }
    function handleHard(event){
        event.preventDefault()
        setDifficulty(false)
        onHandleHard()
    }

    function handleProfile(event){
        event.preventDefault()
        onHandleProfile()
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

    

    { difficulty && <div className="difficulty">
        <h1 className="difficulty__text">CHOOSE A DIFFICULTY</h1>

    <img className='img__easy' src={Easy} onClick={handleEasy} alt="img escroom"/>
    <img className='img__medium' src={Medium} onClick={handleMedium} alt="img escroom"/>
    <img className='img__hard' src={Hard} onClick={handleHard} alt="img escroom"/>
    </div>}
    <a href="" onClick = {handleGoToHome} className="btn--difficulty"><i class="fas fa-undo-alt"></i>Go Back</a>

    </>
}
