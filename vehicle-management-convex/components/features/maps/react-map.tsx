import React, { useCallback, useState } from "react";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface MapProps {
  lat: number;
  lng: number;
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const ReactMap: React.FC<MapProps> = ({ lat, lng }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds({ lat, lng });
      map.fitBounds(bounds);
      setMap(map);
    },
    [lat, lng],
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const center = { lat, lng };
  console.log(map);
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : (
    <div className="loading-map">Loading...</div>
  );
};

export default React.memo(ReactMap);
