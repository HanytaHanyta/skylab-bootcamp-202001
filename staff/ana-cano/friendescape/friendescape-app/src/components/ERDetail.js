import React, { useEffect, useState} from 'react'
import {isLoggedIn, retrieveER, logout} from '../logic'
import Logo from '../images/FriendEscape.png'
import ReactPlayer from 'react-player'
import '../sass/components/ERDetail.sass'
// import Feedback from './Feedback'

export default ({ escaperoomId, user, onGoToLanding, onHandleLogOut }) => {

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

    function handleGoToLanding(event) {
        event.preventDefault()
        onGoToLanding()
    }

    function handleLogOut(event) {
        event.preventDefault()
        onHandleLogOut()

    }



    return <>
        <div className="header">
            <figure>
                <img className='header__logo' src={Logo} alt="Logo" />
            </figure>
            <div className='header__username'>
                <p>Welcome {name}</p>
                <i className="fas fa-sign-out-alt" onClick={handleLogOut}></i>
            </div>
        </div>



        <section className="detail">
            <h3 className="detail__title" >{escaperoom && escaperoom.title}</h3>
            <div className="detail__info">
            <h3>Location: {escaperoom && escaperoom.location}</h3>
            <h4>Description: {escaperoom && escaperoom.description}</h4>
            <h4>Punctuation: {escaperoom && escaperoom.punctuation}</h4>
            <h4>Theme: {escaperoom && escaperoom.theme}</h4>
            <h4>Difficulty: {escaperoom && escaperoom.difficulty}</h4>
            <h4>Duration: {escaperoom && escaperoom.duration}</h4>
            <h4>Price: {escaperoom && escaperoom.price}</h4>
            <h4>Min-players: {escaperoom && escaperoom.minplayers}</h4>
            <h4>Max-players: {escaperoom && escaperoom.maxplayers}</h4>
            </div>
            <img className= "detail__img" width="420" height="315" src={escaperoom && escaperoom.img}/>


            <ReactPlayer width="100%"
            height="auto" className="detail__video" url={escaperoom && escaperoom.video} controls playing />
                <a href={escaperoom && escaperoom.web}>Reserva aquí</a>


            <button >Return landing</button>
        </section>

    </>
}
