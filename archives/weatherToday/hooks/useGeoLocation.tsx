"use client";

import * as React from "react";

type GeolocationPosition = {
  latitude: number;
  longitude: number;
};

export default function useGeolocation() {
  const [geolocation, setGeolocation] =
    React.useState<GeolocationPosition | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const success = (position: any) => {
      setGeolocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    const error = () => {
      setError("Error getting geolocation");
      console.error("Error getting geolocation");
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return { geolocation, error, loading };
}
