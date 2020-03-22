import React from 'react'
// import './Item.sass'
// import Feedback from './Feedback'

export default ({onGoToDetail, escaperoom}) => {
    const {title, location, punctuation, theme, difficulty, price, minplayers, maxplayers, img} = escaperoom
    
    function handleGoToDetail(event) {
        event.preventDefault()
        // event.stopPropagation()
        onGoToDetail()
    }


    return <li className="result-escaperoom">

                <section className="escaperoom_item">
                    <h3>{title}</h3>
                    <h3>{location}</h3>
                    <h4>{punctuation}</h4>
                    <h4>{theme}</h4>
                    <h4>{difficulty}</h4>
                    <h4>{price}</h4>
                    <h4>{minplayers}</h4>
                    <h4>{maxplayers}</h4>
                    <img src={img} alt="escaperoom" className="escaperoom_img"/>

                    <button onClick = {handleGoToDetail} className="btn--detail" > See detail </button>    
                </section>
       </li>
}

