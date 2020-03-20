import React from 'react'
// import './Item.sass'

export default ({albumsGenre, onGoToDetail}) => {
    const {title, location, description, punctuation, them, difficulty, duration, price, minplayers, maxplayers, img} = escaperoom
    return <div>
        <section className="landing__section">
            <img src={portrait} className="landing__album-picture"/>
                <section className="landing__details">
                    <h3>{name}</h3>
                    <h4>{artists[0].name}</h4>
                    <span>{priceVinyl}</span>
                    <button className="landing__button" onClick={event => {
                        event.preventDefault()
                        onGoToDetail(id)
                    }}>BUY IT</button>
                </section>
        </section>
    </div>
}