import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import "../css/Map.css"

export default function App() {
const positionOuija = [41.432184, 2.218863]
const positionParanormal = [40.398845, -3.702226]
const positionInframundo = [41.934602,2.250503]
const positionGhost = [43.254778, -2.917684]
const positionSummer = [41.539940, 2.453419]
const positionLegado = [40.970096, -5.665814]
const positionCastillo = [41.386425, 2.180653]
const positionBlas = [43.336804, -1.787969]
const positionChernobyl = [37.894547,-4.764136]
const positionVacuna = [37.373034,-5.995425]
const positionBosco = [41.440115, 2.163539]
const positionSecreto = [42.851687,-5663380]
const positionTrono = [38.260596, -0.704489]
const positionAsalto= [40.337152, -3.526194]
const positionBoom= [39.475233, -0.384233]
const positionAsesino = [43.3300096, -3.035931]
const positionPadrino = [41.654832, -4.719304]
const positionBlanca = [40.405172, -3.716467]
const positionFuturo = [37.374614, -6.002822]


    return (
        <Map center={[40.429965, -3.697407]} zoom={5}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={positionOuija}>
                <Popup>Ouija (Horror Box)<br/>
                <a target="_blank" href="http://www.horrorbox.es/producto/ouija-escape-room/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionParanormal}>
                <Popup>Paranormal experience<br/>
                <a target="_blank" href="https://www.madridterror.com">Web</a>   </Popup>
            </Marker>
            <Marker position={positionInframundo}>
                <Popup>Inframundo<br/>
                <a target="_blank" href="https://amazein60.com/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionGhost}>
                <Popup>Ghost adventure<br/>
                <a target="_blank" href="https://guaridaventuras.com/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionSummer}>
                <Popup>Horror Summer<br/>
                <a target="_blank" href="https://www.kaosescapes.com/booking">Web</a>   </Popup>
            </Marker>
            <Marker position={positionLegado}>
                <Popup>El legado de Laozi<br/>
                <a target="_blank" href="http://www.fluxusgames.com/services/laozi/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionCastillo}>
                <Popup> Castillo Sant Angelo<br/>
                <a target="_blank" href="https://komnataquest.es/barcelona/escape-room-quest-sanangeloit/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionBlas}>
                <Popup> Blas de Lezo<br/>
                <a target="_blank" href="https://www.vientoenpopaescape.es/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionChernobyl}>
                <Popup> Chernobyl<br/>
                <a target="_blank" href="https://tiempolimitecordoba.com/sala-2/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionVacuna}>
                <Popup> La vacuna del Dr. Painokovic<br/>
                <a target="_blank" href="https://www.escaperoomarcadia.com/reservar/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionBosco}>
                <Popup> Las profecías de El Bosco<br/>
                <a target="_blank" href="http://totemescaperoom.com/es/reservas/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionSecreto}>
                <Popup> El secreto de la montaña<br/>
                <a target="_blank" href="https://www.hauntedhouse.es/escapes/el-secreto-de-la-montana/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionTrono}>
                <Popup> El Trono de Hierro <br/>
                <a target="_blank" href="https://komnataquest.es/elche/244/timetable/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionAsalto}>
                <Popup> El Trono de Hierro <br/>
                <a target="_blank" href="https://elcuboescaperoom.com/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionBoom}>
                <Popup> Boom Escape<br/>
                <a target="_blank" href="https://elcuboescaperoom.com/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionAsesino}>
                <Popup> El asesino del Vitruvio <br/>
                <a target="_blank" href="http://www.horalimite-escaperoom.es/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionPadrino}>
                <Popup> El Padrino <br/>
                <a target="_blank" href="https://thekeyvalladolid.com/padrino-mafiosos/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionBlanca}>
                <Popup> Experiencia Blanca <br/>
                <a target="_blank" href="https://experiencitymadrid.com/experiencia-blanca/">Web</a>   </Popup>
            </Marker>
            <Marker position={positionFuturo}>
                <Popup> Steampunk, el futuro Tempo <br/>
                <a target="_blank" href="https://www.escaperoomlover.com/es/juego/tempo-0-sevilla-steampunk-el-futuro">Web</a>   </Popup>
            </Marker>
            
        </Map>
       
    );
    

}
 



