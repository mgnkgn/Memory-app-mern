import React, { createContext, useReducer } from "react";
import MainReducer from "./MainReducer";
const initialState = {
  laposition: [],
  info: [],
  formStatus: false,
  formCorrect: true,
  locationToGo: { lat: 0, lng: 0 },
  isLoggedIn: { admin: false, guest: false },
};
export const MainContext = createContext(initialState);

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState);

  // markerInfo
  const pushData = (dataPosition) => {
    dispatch({
      type: "PUSH_MARKER",
      payload: dataPosition,
    });
  };

  // formInfo
  const pushFormData = (formData) => {
    dispatch({
      type: "PUSH_FORM",
      payload: formData,
    });
  };

  // delete formInfo
  const deleteFormData = (afterDel) => {
    dispatch({
      type: "DEL_FORM",
      payload: afterDel,
    });
  };

  const makeFormVisible = (status) => {
    dispatch({
      type: "FORM_VISIBLE",
      payload: status,
    });
  };

  const formFilledCorrect = (val) => {
    dispatch({
      type: "FORM_STATUS_FILL",
      payload: val,
    });
  };

  const goToClickedLocation = (val) => {
    dispatch({
      type: "FLY_TO_LOCATION",
      payload: val,
    });
  };

  const adminLogIn = (val) => {
    dispatch({
      type: "ADMIN_LOGIN",
      payload: val,
    });
  };

  const guestLogIn = (val) => {
    dispatch({
      type: "GUEST_LOGIN",
      payload: val,
    });
  };

  return (
    <MainContext.Provider
      value={{
        laposition: state.laposition,
        info: state.info,
        formStatus: state.formStatus,
        state,
        formCorrect: state.formCorrect,
        locationToGo: state.locationToGo,
        isLoggedIn: state.isLoggedIn,
        pushData,
        pushFormData,
        makeFormVisible,
        formFilledCorrect,
        goToClickedLocation,
        deleteFormData,
        adminLogIn,
        guestLogIn,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
