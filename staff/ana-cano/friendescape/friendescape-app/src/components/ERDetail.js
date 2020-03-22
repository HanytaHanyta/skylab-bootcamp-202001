import React from 'react'
// import './Item.sass'
// import Feedback from './Feedback'

export default ({ onGoToLanding, escaperoom}) => {
    const {title, location, description, punctuation, theme, difficulty, duration, price, minplayers, maxplayers, img, web, video} = escaperoom
    
    function handleGoToLanding(event) {
        event.preventDefault()
        onGoToLanding()
    }

    return <div>
        <section className="escape_item">

                <section className="escaperoom_detail">
                    <h3>{title}</h3>
                    <h3>{location}</h3>
                    <h4>{description}</h4>
                    <h4>{punctuation}</h4>
                    <h4>{theme}</h4>
                    <h4>{difficulty}</h4>
                    <h4>{duration}</h4>
                    <h4>{price}</h4>
                    <h4>{minplayers}</h4>
                    <h4>{maxplayers}</h4>
                    <img src={img} alt="escaperoom" className="escaperoom_img"/>
                    <video width="320" height="240" controls>
                    <a href={web}></a>
                    <source src={video} type="video/mp4">
                    </source>
                    <source src={video} type="video/ogg">
                    </source>
                    </video>
                    <button onClick = {handleGoToLanding}>Return landing</button>     
                </section>
        </section>
    </div>
}