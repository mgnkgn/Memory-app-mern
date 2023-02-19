import React, { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { MainContext } from "../store/context-main";
import ListItem from "./ListItem";
import UseMemory from "./UseMemory";
const List = () => {
  const { state, info, laposition, pushData, pushFormData } =
    useContext(MainContext);
  const { data, isLoading, error } = UseMemory();
  useEffect(() => {
    if (data) {
      for (const x of data.dataForForm) {
        pushFormData(x);
      }
      for (const x of data.dataForMarker) {
        pushData(x);
      }
    }
  }, [data]);

  if (isLoading && !error) {
    return (
      <div className="main-list-ct">
        <div className="spinner"></div>
        <p className="loading-p">Loading...</p>
      </div>
    );
  }
  if (!error && !isLoading) {
    return (
      <div className="main-list-ct">
        <div>
          {data.dataForForm.length > 0 ? (
            data.dataForForm.map((item, index) => {
              const pozForList = data.dataForMarker[index];
              const randomNum = Math.random() * 3.5 + 2;

              return (
                <ListItem
                  key={`${item.id}-${index}`}
                  id={`${item._id}`}
                  id2={`${pozForList._id}`}
                  numForCss={randomNum}
                  clubName={item.enteredClubName}
                  time={item.arrangedDuration}
                  date={item.arrangedDate}
                  pozLat={pozForList.lat}
                  pozLng={pozForList.lng}
                />
              );
            })
          ) : (
            <p className="inv_form_msg cl-main">Your Memos Will Drop Here 🐸</p>
          )}
        </div>
      </div>
    );
  }
  if (error && !isLoading) {
    <div>{error}</div>;
  }
};

export default List;
