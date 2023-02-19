import React, { useContext } from "react";
import { MainContext } from "../store/context-main";

const Logo = () => {
  const { goToClickedLocation } = useContext(MainContext);

  const goToLocation = () => {
    goToClickedLocation({
      lat: 52.52,
      lng: 13.405,
    });
  };
  return (
    <img
      src={require("../img/SpacerWoman.png")}
      alt="logo"
      className="logo_img"
      onClick={goToLocation}
    />
  );
};

export default Logo;
