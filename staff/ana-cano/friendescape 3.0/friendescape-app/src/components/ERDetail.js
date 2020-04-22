import React, { useEffect, useState} from 'react'
import {isLoggedIn, retrieveER, logout} from '../logic'
import Logo from '../images/FriendEscape.png'
import ReactPlayer from 'react-player'
import '../sass/components/ERDetail.sass'
// import Feedback from './Feedback'

export default ({ escaperoomId, user, onHandleProfile, onHandleGoHome, onHandleLogOut }) => {

    const [escaperoom, setEscaperoom] = useState()

    useEffect(() => {

            (async() => {
                try {
                    const escaperoom = await retrieveER(escaperoomId)
                    setEscaperoom(escaperoom)

                } catch (error) {
                    console.error ( error.message)
                }
          })()

      })

    const { name } = user


    // const { title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video } = escaperoom

    
    function handleLogOut(event) {
        event.preventDefault()
        onHandleLogOut()

    }

    function handleGoToHome(event){
        event.preventDefault()
        onHandleGoHome()
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



        <section className="detail">
            <h3 className="detail__title" >{escaperoom && escaperoom.title}</h3>
            <div className="detail__info">
            <h3>Location: {escaperoom && escaperoom.location}</h3>
            <h4>Description: {escaperoom && escaperoom.description}</h4>
            <h4>Punctuation: <span class={"rating-five rating-five-" +(escaperoom && escaperoom.punctuation)}></span></h4>
            <h4>Theme: {escaperoom && escaperoom.theme}</h4>
            <h4>Difficulty: <span class={"rating-three rating-three-" + (escaperoom && escaperoom.difficulty)}></span></h4>
            <h4>Duration: {escaperoom && escaperoom.duration}</h4>
            <h4>Price: {escaperoom && escaperoom.price}</h4>
            <h4>Min-players: {escaperoom && escaperoom.minplayers}</h4>
            <h4>Max-players: {escaperoom && escaperoom.maxplayers}</h4>
            </div>
            <img className= "detail__img" width="420" height="315" src={escaperoom && escaperoom.img}/>


            <ReactPlayer className="player-wrapper" width="100%"
            height="21rem" url={escaperoom && escaperoom.video} controls playing />
            <a target="_blank" className="btn__detail" href={escaperoom && escaperoom.web}><i class="fas fa-ticket-alt"></i>Reserva aquí</a>


                <a href="" onClick = {handleGoToHome} className="btn--locations"><i class="fas fa-undo-alt"></i>Go Back</a>
        </section>

    </>
}
