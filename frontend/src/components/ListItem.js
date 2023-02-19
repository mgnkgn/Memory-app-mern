import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MainContext } from "../store/context-main";

const ListItem = (props) => {
  const location = useLocation();
  const { goToClickedLocation, deleteFormData, info, isLoggedIn } =
    useContext(MainContext);

  const goToLocation = (lat, lng) => {
    goToClickedLocation({
      lat: lat,
      lng: lng,
    });
  };

  const deleteFormDataFromDb = async (id1, id2) => {
    const response = await fetch(
      `http://localhost:8000/api/memories/${id1}${id2}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const json = response.json();
    // console.log(json);
    // console.log(id1, id2);
  };

  const deleteHandler = (id1, id2) => {
    const newArray = info.filter((item) => item.id !== +id1);
    // console.log(info);
    // console.log(id1);
    // console.log(newArray);
    // deleting from ctx
    deleteFormData(newArray);
    // deleting from express
    deleteFormDataFromDb(id1, id2);
  };
  // console.log(info);
  return (
    <div
      className={`${"list-item-ct"}`}
      style={{ animation: `animate ${props.numForCss}s ease-in-out infinite` }}
      onClick={() => {
        goToLocation(props.pozLat, props.pozLng);
      }}
    >
      <div className="club-name">🌃: {props.clubName}</div>
      <div className="club-time">⏱️: {props.time} hours</div>
      <div className="club-date">📅: {props.date}</div>
      {location.pathname === "/api/spacer" && (
        <button
          className="btn-delete"
          onClick={() => {
            deleteHandler(props.id, props.id2);
          }}
        >
          X
        </button>
      )}
    </div>
  );
};

export default ListItem;
