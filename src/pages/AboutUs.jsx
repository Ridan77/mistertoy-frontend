import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { useState } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
console.log(API_KEY);


export function AboutUs() {
  const [coords, setCoors] = useState({ lat: 32.0853, lng: 34.7818 });
  const [markerRef, marker] = useAdvancedMarkerRef();
    function onMapClick(ev) {
        // console.log('ev:', ev)
        setCoors(ev.detail.latLng)
        ev.map.panTo(ev.detail.latLng)
    }
  return (
    <section>
      <h2>About Us</h2>
      <section className="google-map">
        <h1>Google Maps!</h1>
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultZoom={11}
            mapId={"mapid-122223"}
            defaultCenter={coords}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            onClick={onMapClick}>
            <InfoWindow anchor={marker} maxWidth={200}>
              <p>
                This is the content for another infowindow with <em>HTML</em>
                -elements.
              </p>
            </InfoWindow>
            {/* <AdvancedMarker
              position={coords}
              ref={markerRef}
              title={"AdvancedMarker with customized pin."}>
              <Pin
                background={"#22ccff"}
                borderColor={"#1e89a1"}
                glyphColor={"#0f677a"}></Pin>
            </AdvancedMarker> */}
          </Map>
        </APIProvider>
      </section>
    </section>
  );
}
