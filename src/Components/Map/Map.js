import React, {useEffect} from 'react'
import './Map.css'

export default Map({center, marker, markerLabel }) {

  var map = window.L.mapquest.map('map', {
    center: [location.place.geometry.coordinates[1],location.place.geometry.coordinates[0]],
    layers: window.L.mapquest.tileLayer('map'),
    zoom: 15
  });

  useEffect(()=> {
  marker && markerLabel:window.L.marker( [location.place.geometry.coordinates[1],location.place.geometry.coordinates[0]], { //to hover over marker it shows event title
    icon: window.L.mapquest.icons.flag({
      primaryColor: '#000000',
      secondaryColor: '#000000',
      size: 'sm',
      symbol: 'hello'
    }),
    draggable: true
  }).bindPopup(location.name).addTo(map):return

},[])

return (
  <div id="map" className="event-form-map-container">
    </div>
)
}
