import React, { useContext } from "react";
import { useLocation } from "react-router-dom";

import { MainContext } from "../store/context-main";

const FormInvisible = () => {
  const location = useLocation();
  const { isLoggedIn } = useContext(MainContext);
  return (
    <div className={isLoggedIn.admin ? `form` : `form form-guest`}>
      {location.pathname === "/api/spacer" ? (
        <p className="inv_form_msg">Click somewhere to register memory 🐸</p>
      ) : (
        <div>
          <div className="spinner"></div>
          <div style={{ marginTop: "-30px" }}>Welcome, guest</div>
        </div>
      )}
    </div>
  );
};

export default FormInvisible;
