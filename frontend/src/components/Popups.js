import React, { useContext } from "react";
import { Popup } from "react-leaflet";
import { MainContext } from "../store/context-main";
const Popups = () => {
  const { state } = useContext(MainContext);
  return (
    <>
      {state.info.map((item) => (
        <Popup>
          {`${item.enteredClubName}  ${item.arrangedDate} 
          ${item.arrangedDuration}`}
        </Popup>
      ))}
    </>
  );
};

export default Popups;
