import React from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = ({ latitude, longitude }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API,
  });

  if (loadError) {
    return <div>Error loading map</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const position = { lat: latitude, lng: longitude };

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={position} zoom={15}>
      <MarkerF position={position} />
    </GoogleMap>
  );
};

export default Map;
