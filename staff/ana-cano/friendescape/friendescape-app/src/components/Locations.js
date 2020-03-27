import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


export default function ({ }) {
const state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

    const position = [state.lat, state.lng]
    return <>
    <Map className="map" center={position} zoom={state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
  </>
}