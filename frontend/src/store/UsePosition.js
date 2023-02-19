import React, { useState, useEffect } from "react";

const UsePosition = () => {
  const [position, setPosition] = useState({});
  const [error, setError] = useState({});

  const onChange = ({ coords }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      setError("Error occured regading geolocation");
      return;
    }

    const watcher = geo.getCurrentPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position, ...error };
};

export default UsePosition;
