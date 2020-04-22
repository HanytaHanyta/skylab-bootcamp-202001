import React from 'react'
import Item from './Item'


export default function ({ difficultyEscapes, onGoToDetail}) {


return <>


<div className="escapesroom cards search">
 <h1 className= "cards__title">Escape Rooms</h1>
 <ul>
     {difficultyEscapes.map(escapeRoom => <Item key={escapeRoom._id} item={escapeRoom} onGoToDetail={onGoToDetail}/>)}
 </ul>
</div>

    </>
}
