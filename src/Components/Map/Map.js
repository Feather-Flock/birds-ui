import React, {useEffect} from 'react'
import './Map.css'

export default function Map({center, markers, handleClick, view }){
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
  if (markers) {
    markers.forEach((location) => {
      let marker = window.L.marker([location.lat, location.lng], {
        icon: window.L.mapquest.icons.flag({
          primaryColor: '#000000',
          secondaryColor: '#000000',
          size: 'sm',
          symbol: 'hello'
        }),
        draggable: false
      }).bindPopup(location.title).addTo(map)
      if(handleClick) {
      marker.on("click", (e) => {
    const mappedEvent = {target: {id: location.id}}
    handleClick(mappedEvent)
  })
}
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
