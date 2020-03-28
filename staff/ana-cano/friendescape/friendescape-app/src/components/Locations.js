// import React, { Component } from 'react'
// import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


// export default function ({ }) {
// const state = {
//     lat: 51.505,
//     lng: -0.09,
//     zoom: 13,
//   }

//     const position = [state.lat, state.lng]
//     return <>
//     <Map className="map" center={position} zoom={state.zoom}>
//         <TileLayer
//           attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={position}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </Map>
//   </>
// }
import Logo from '../images/FriendEscape.png'
import React from 'react'
import Map from './Map.js'
export default function (user) {
   return <>
       <div className="header">
    <figure>
        <img className='header__logo' src ={Logo} alt="Logo"/>
    </figure>
    <div className='header__username'>
    <p>Welcome </p>
    <i className="fas fa-sign-out-alt"npm ></i>
    </div>
    </div>

      <div className="container-contact">
         <div className="container-contact__location">
            <div className="location">
               <i className="fa fa-map-marker mapMarker"></i>
               <h4>Nuestra dirección</h4>

            </div>
         </div>
         <div className="container-contact__email">
            <div className="location">
               <i className="fa fa-envelope"></i>
               <h4>Nuestro email</h4>
               <p>contacto@badabicisport.com</p>
            </div>
         </div>
         <div className="container-contact__phone">
            <div className="location">
               <i className="fa fa-phone phoneNum"></i>
               <h4>Nuestro teléfono</h4>
               <p>933811943</p>
            </div>
         </div>
      </div>
         <div className='container-map'>
            <Map />
         </div>
   </>
}
