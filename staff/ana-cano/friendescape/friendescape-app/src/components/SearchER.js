import React from 'react'
import Item from './Item'
// import './Results-item.sass'

export default ({albumsGenre, onGoToDetail}) => {

    return <section className="escapesroom">
        {escaperooms.map((escaperoom, index) => <Item key={index} albumsGenre={album} onGoToDetail={onGoToDetail}/>)}
    </section>

}