import React from "react";
import { v4 as uuidV4 } from "uuid";

const MarkerItem = (props) => (
  <section className="popup">
    <div className="popup_rows">
      🌃:{" "}
      {props.club && props.club.length > 10
        ? props.club.substring(0, 11)
        : props.club}
    </div>
    <div className="popup_rows">
      ⏱️:{" "}
      {props.duration && props.duration.length > 10
        ? props.duration.substring(0, 11)
        : props.duration}{" "}
      hours
    </div>
    <div className="popup_rows">📅: {props.date}</div>
  </section>
);

export default MarkerItem;
