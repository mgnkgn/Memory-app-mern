import React, { useContext } from "react";
import { v4 as uuidV4 } from "uuid";
import { Marker, Popup, useMapEvents } from "react-leaflet";

import MarkerItem from "./MarkerItem";
import { MainContext } from "../store/context-main";

import UseMemory from "./UseMemory";

const Markers = () => {
  const {
    pushData,
    makeFormVisible,
    formCorrect,
    formFilledCorrect,
    isLoggedIn,
  } = useContext(MainContext);

  const { data, isLoading, error } = UseMemory();

  const postMarkerToDb = async (markerObj) => {
    const response = await fetch("http://localhost:8000/api/memories/new", {
      method: "POST",
      body: JSON.stringify(markerObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };

  // console.log(data);
  const map = useMapEvents({
    click(e) {
      if (formCorrect && isLoggedIn.admin) {
        formFilledCorrect(false);

        makeFormVisible(true);

        const formedData = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          id: uuidV4(),
          type: "marker",
        };
        postMarkerToDb(formedData);
        pushData(formedData);
      }
    },
  });

  let appDataArr = [];

  if (data) {
    for (let i = 0; i < data.dataForMarker.length; i++) {
      const appData = {
        form: data.dataForForm[i],
        location: data.dataForMarker[i],
      };
      appDataArr.push(appData);
    }
    // console.log(appDataArr);
  }
  return (
    <React.Fragment>
      {appDataArr.map((data, index) => (
        <Marker position={data.location} key={`${index}-${data.location.id}`}>
          {data.form ? (
            <Popup className="popup_container">
              <MarkerItem
                key={`markItem-${index}-${data.location.id}`}
                club={data.form.enteredClubName}
                date={data.form.arrangedDate}
                duration={data.form.arrangedDuration}
              />
            </Popup>
          ) : (
            <div>"Fill the form please"</div>
          )}
        </Marker>
      ))}
    </React.Fragment>
  );
};

export default Markers;
