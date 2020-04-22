import React, { useState } from 'react'
import Logo from '../images/FriendEscape.png'
import Abstract from '../images/abstract.jpg'
import Apocalyptic from '../images/apocalypnew.jpg'
import Fiction from '../images/fantasy.jpeg'
import Historycal from '../images/history.jpg'
import Fear from '../images/fear.jpg'
import Carousel from '@brainhubeu/react-carousel'

import '@brainhubeu/react-carousel/lib/style.css'
import '../sass/components/themes.sass'


export default function ({user, onHandleProfile, onHandleLogOut, onHandleGoHome, onHandleFiction, onHandleHistorical, onHandleCriminal, onHandleFear}) {
    const {name} = user
    const [theme, setTheme] = useState(true)

            
    
    function handleLogOut(event){
        event.preventDefault()
        onHandleLogOut()

    }

  function handleGoToHome(event){
      event.preventDefault()
      onHandleGoHome()
   }

  function handleCriminal(event){
      event.preventDefault()
      setTheme(false)
      onHandleCriminal()
  }
  function handleFear(event){
      event.preventDefault()
      setTheme(false)
      onHandleFear()
  }
  function handleHistorical(event){
      event.preventDefault()
      setTheme(false)
      onHandleHistorical()
  }
  function handleFiction(event){
    event.preventDefault()
    setTheme(false)
    onHandleFiction()
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

    <div className="theme">
   { theme && <Carousel
  autoPlay={2000}
  animationSpeed={1000}
  infinite
>
            <div>
            <img src={Apocalyptic} onClick={handleCriminal}/> Criminal
            </div>
            <div>
            <img src={Fiction} onClick={handleFiction}/> Fiction
            </div>
            <div>
            <img src={Historycal} onClick={handleHistorical}/> Historical
            </div>
            <div>
            <img src={Fear} onClick={handleFear}/> Fear
            </div>
            
</Carousel>
}
<a href="" onClick = {handleGoToHome} className="btn--locations"><i class="fas fa-undo-alt"></i>Go Back</a>
   
</div>
    </>
}

