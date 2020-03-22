import React, { useEffect, useState } from 'react'
import './item.sass'



export default function ({ key, item, onClick }) {

    const {title,theme,img, difficulty, punctuation} = item
    function handleGoToDetail(event) {
        event.preventDefault()
        onClick()
    }
    
    // "_id": "5e67acb84a794ec5ac74f249",
    // "title": "Ouija (Horror Box)",
    // "location": "C/Indústria 268 - Barcelona",
    // "description": "Buscamos grupos de 2 a 6 personas que acepten el reto de enfrentarse al juego más temido de todos los tiempos en un lugar inquietante. Solo vuestro ingenio, intuición y lógica os permitirán descifrar los secretos y enigmas que guarda esta experiencia.Espiritismo, exorcismo, ocultismo, magia negra, santería, vudú… No abras puertas que quizá no puedes cerrar…",
    // "punctuation": 5,
    // "theme": "fear",
    // "difficulty": 2,
    // "duration": "60",
    // "minplayers": 2,
    // "maxplayers": 6,
    // "img": "https://www.escaperoomlover.com/storage/files/af2mD7cQ1513096282.3779.jpg",
    // "web": "http://www.horrorbox.es/producto/ouija-escape-room/",
    // "video": "https://www.youtube.com/watch?v=xIjldIMJE0o&feature=emb_logo"

     return <>
        <li className="results--item item" onClick={handleGoToDetail}>
            <h4>Title: {title}</h4>
            <h5>Theme: {theme}</h5>
            <h5>Difficulty: {difficulty}</h5>
            <img src={img} />
            <h5>Punctuation: {punctuation}</h5>
            
        </li>
    </>
}
