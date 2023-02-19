import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// import UsePosition from "./store/UsePosition";
import { MainContext, MainContextProvider } from "./store/context-main";
import MapMain from "./components/MapMain";
import Form from "./components/Form";
import "./App.css";
import FormInvisible from "./components/FormInvisible";
import Logo from "./components/Logo";
import List from "./components/List";
import Login from "./components/Login";

function App() {
  const {
    formStatus,
    makeFormVisible,
    pushData,
    isLoggedIn,
    adminLogIn,
    guestLogIn,
  } = useContext(MainContext);

  const loginHandler = () => {
    adminLogIn(true);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <main>
            {isLoggedIn.guest ? (
              <div className="first_column">
                <div className="first_column_upper">
                  <Logo />
                  {formStatus === true ? <Form /> : <FormInvisible />}
                </div>
                <div className="first_column_lower">
                  <List />
                </div>
              </div>
            ) : (
              <Login />
            )}
            <MapMain />
          </main>
        }
      />
      <Route
        exact
        path="/api/spacer"
        element={
          isLoggedIn.admin ? (
            <main>
              <div className="first_column">
                <div className="first_column_upper">
                  <Logo />
                  {formStatus === true ? <Form /> : <FormInvisible />}
                </div>
                <div className="first_column_lower">
                  <List />
                </div>
              </div>
              <MapMain />
            </main>
          ) : (
            <main>
              {isLoggedIn.guest ? (
                <div className="first_column">
                  <div className="first_column_upper">
                    <Logo />
                    {formStatus === true ? <Form /> : <FormInvisible />}
                  </div>
                  <div className="first_column_lower">
                    <List />
                  </div>
                </div>
              ) : (
                <Login />
              )}
              <MapMain />
            </main>
          )
        }
      />
    </Routes>
  );
}

export default App;
