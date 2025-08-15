import {
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
const branches = [
  {
    city: "Tel Aviv",
    id: 102,
    position: { lat: 32.071035, lng: 34.779118 },
  },

  {
    city: "Hadera",
    id: 103,
    position: { lat: 32.435594930999166, lng: 34.92083787918091 },
  },
  {
    city: "Hulon",
    id: 101,
    position: { lat: 32.01840842432221, lng: 34.77865648344314 },
  },
];

export function ToyMap() {
  return (
    <section className="google-map">
      <h3>Our Branches:</h3>

      <APIProvider apiKey={API_KEY}>
        <MapController />
      </APIProvider>
    </section>
  );
}

function MapController() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [coords, setCoors] = useState({ lat: 32.0853, lng: 34.7818 });

  const [markerRef, marker] = useAdvancedMarkerRef();
  const map = useMap();

  useEffect(() => {
    if (map && selectedBranch) {
      map.panTo(selectedBranch.position);
      map.setZoom(14);
    }
  }, [map, selectedBranch]);

  function onMapClick(ev) {
    setCoors(ev.detail.latLng);
    ev.map.panTo(ev.detail.latLng);
  }

  function handleBranchClick(branch) {
    setCoors(branch.position);
    setSelectedBranch(branch);
  }

  return (
    <>
      <button onClick={() => handleBranchClick(branches[0])}>Tel Aviv</button>
      <button onClick={() => handleBranchClick(branches[1])}>Hadera</button>
      <button onClick={() => handleBranchClick(branches[2])}>Hulon</button>

      <Map
        style={{ height: "55vh", width: "100%" }}
        defaultZoom={11}
        mapId={"mapid-122223"}
        defaultCenter={coords}
        // center={coords}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        onClick={onMapClick}>
        {branches.map((branch) => (
          <AdvancedMarker position={branch.position} key={branch.id}>
            <Pin />
          </AdvancedMarker>
        ))}
        {selectedBranch && (
          <InfoWindow anchor={marker} maxWidth={200}>
            <p>Our branch in {selectedBranch.city}</p>
          </InfoWindow>
        )}
        <AdvancedMarker
          position={coords}
          ref={markerRef}
          title={"AdvancedMarker with customized pin."}>
          <Pin
            background={"#22ccff"}
            borderColor={"#1e89a1"}
            glyphColor={"#0f677a"}
          />
        </AdvancedMarker>
      </Map>
    </>
  );
}
