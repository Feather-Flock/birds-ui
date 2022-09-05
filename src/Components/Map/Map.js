import React, {useEffect} from 'react'
import './Map.css'

export default function Map({center, markers, markerLabel, handleClick, view }){
  useEffect(()=> {
    window.L.mapquest.key = process.env.REACT_APP_MAPQUEST_KEY;
  const container = window.L.DomUtil.get("map")
  if(container != null) {
    container._leaflet_id = null;
  }

  var map = window.L.mapquest.map('map', {
    center: center,
    layers: window.L.mapquest.tileLayer('map'),
    zoom: 11
  });

  if (markers && markerLabel ) {
    markers.forEach((location) => {
      let marker = window.L.marker([location.lat, location.lng], { //to hover over marker it shows event title
        icon: window.L.mapquest.icons.flag({//custom marker
          primaryColor: '#000000',
          secondaryColor: '#000000',
          size: 'sm',
          symbol: 'hello'
        }),
        draggable: false
      }).bindPopup(location.title).addTo(map);
      marker.on("click", (e) => {
    //mappedEvent is modeling what the event looks like when you
    //click on a button.  handleclick function is looking for
    // an id on e.target. >> e.target.id === mappedEvent.target.id
    const mappedEvent = {target: {id: location.id}}
    handleClick(mappedEvent)
  })
})
} else {
  return
}
},[center])

return (
  <div id="map" className={view === 'event-form' ? 'event-form-map-container' : 'map-container'}>
    </div>
)
}
