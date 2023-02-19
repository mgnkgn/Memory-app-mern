import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: "", lng: "" },
  });

  const onSuccess = (location) => {
    setLocation({
      loaded: true,
      coords: {
        lat: location.coords.latitude,
        long: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error: {},
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        loaded: true,
        error: { code: 0, message: "Geolocation is not supported" },
      });
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);
  return location;
};

export default useGeoLocation;
