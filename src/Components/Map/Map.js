import React, {useEffect} from 'react'
import './Map.css'

export default function Map({center, marker, markerLabel, markers, handleClick }){

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
     window.L.marker(marker, { //to hover over marker it shows event title
    icon: window.L.mapquest.icons.flag({
      primaryColor: '#000000',
      secondaryColor: '#000000',
      size: 'sm',
      symbol: 'hello'
    }),
    draggable: true
  }).bindPopup(markerLabel).addTo(map)
} else if(markers){
markers.forEach((nearbyEvent) => {
  let marker = window.L.marker([nearbyEvent.lat, nearbyEvent.lng], { //to hover over marker it shows event title
    icon: window.L.mapquest.icons.flag({//custom marker
      primaryColor: '#000000',
      secondaryColor: '#000000',
      size: 'sm',
      symbol: 'hello'
    }),
    draggable: false
  }).bindPopup(nearbyEvent.title).addTo(map);
  marker.on("click", (e) => {
    //mappedEvent is modeling what the event looks like when you
    //click on a button.  handleclick function is looking for
    // an id on e.target. >> e.target.id === mappedEvent.target.id
    const mappedEvent = {target: {id: nearbyEvent.id}}
    handleClick(mappedEvent)
  })
})
} else {
  return
}
},[center])

return (
  <div id="map" className="event-form-map-container">
    </div>
)
}
