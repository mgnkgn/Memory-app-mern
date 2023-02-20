import React, { useState, useEffect, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { MainContext } from "../store/context-main";
import Markers from "./Markers";
import YouAreHere from "./YouAreHere";
import L from "leaflet";

const MapMain = () => {
  const { locationToGo } = useContext(MainContext);
  const [poz, setPoz] = useState({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      setPoz({
        lat: latitude,
        lng: longitude,
      });
    });
  }, []);

  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(poz);
    }, [poz]);

    return null;
  }

  function FlyToLocation() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(locationToGo);
    }, [locationToGo]);
  }
  // home position
  const position = { lat: 52.520008, lng: 13.404954 };

  const myIcon = L.icon({
    iconUrl: require("../img/icons8-home-500.png"),
    iconSize: [32, 32],
    iconAnchor: [30, 30],
    // popupAnchor: [52.52, 13.4],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  return (
    <MapContainer center={[50, 10]} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyMapTo />
      <FlyToLocation />
      <Marker icon={myIcon} position={position} key={"marker-nda"}>
        <Popup>
          <div>Hello there👋</div>
        </Popup>
      </Marker>
      <Markers />
    </MapContainer>
  );
};

export default MapMain;
