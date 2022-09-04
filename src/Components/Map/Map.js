import React, {useEffect} from 'react'
import './Map.css'

export default function Map({center, marker, markerLabel }){

  useEffect(()=> {
    window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;
  const container = window.L.DomUtil.get("map")
  if(container != null) {
    container._leaflet_id = null;
  }

  var map = window.L.mapquest.map('map', {
    center: center,
    layers: window.L.mapquest.tileLayer('map'),
    zoom: 15
  });

  if (marker && markerLabel ) {
    console.log("reran this")
     window.L.marker(marker, { //to hover over marker it shows event title
    icon: window.L.mapquest.icons.flag({
      primaryColor: '#000000',
      secondaryColor: '#000000',
      size: 'sm',
      symbol: 'hello'
    }),
    draggable: true
  }).bindPopup(markerLabel).addTo(map)
} else {
  return
}

},[center])

return (
  <div id="map" className="event-form-map-container">
    </div>
)
}
