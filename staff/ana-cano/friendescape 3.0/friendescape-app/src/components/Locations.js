import React from 'react'
import '../sass/components/locations.sass'
import Logo from '../images/FriendEscape.png'
import Map from './Map.js'





export default function ({user, onHandleGoHome, onHandleLogOut, onHandleProfile}) {
   const {name} = user

   function handleGoToHome(event){
      event.preventDefault()
      onHandleGoHome()
   }

   function handleLogOut(event){
      event.preventDefault()
      onHandleLogOut()

  }

  function handleProfile(event){
   event.preventDefault()
   onHandleProfile()
}

   return <>
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

     
         <div className='container-map'>
         
         <a href="" onClick = {handleGoToHome} className="btn--locations"><i class="fas fa-undo-alt"></i>Go Back</a>
            <Map />
         </div>
   </>
}
