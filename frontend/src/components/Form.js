import React, { useRef, useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { MainContext } from "../store/context-main";

const Form = () => {
  const { pushFormData, makeFormVisible, formFilledCorrect } =
    useContext(MainContext);
  const clubNameInputRef = useRef();
  const dateInputRef = useRef();
  const durationInputRef = useRef();
  const [typedClubName, setTypedClubName] = useState();
  const [typedDuration, setTypedDuration] = useState();
  const [typedDate, setTypedDate] = useState();
  const [btnClickable, setBtnClickable] = useState(false);

  const checkBtnClickable = () => {
    if (
      typedClubName?.length !== 0 &&
      +typedDuration !== 0 &&
      typedDate?.length !== 0
    ) {
      setBtnClickable(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    formFilledCorrect(false);
    const enteredClubName = clubNameInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredDuration = durationInputRef.current.value;
    const arrangedDate = enteredDate.split("-").reverse().join("/");
    const arrangedDuration = `${enteredDuration}`;

    if (
      enteredClubName.length === 0 ||
      +enteredDuration === 0 ||
      enteredDate.length === 0
    ) {
      formFilledCorrect(false);
      return;
    }
    formFilledCorrect(true);
    const formedFormData = {
      enteredClubName,
      arrangedDate,
      arrangedDuration,
      type: "form",
      id: uuidV4(),
    };
    pushFormData(formedFormData);
    const response = await fetch(
      "https://swmemoryapp.onrender.com/api/memories/new",
      {
        method: "POST",
        body: JSON.stringify(formedFormData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const json = response.json();
    console.log(json);

    clubNameInputRef.current.value = "";
    dateInputRef.current.value = "";
    durationInputRef.current.value = "";
    makeFormVisible(false);
  };

  return (
    <div className="form_container">
      <form className="form" onSubmit={submitHandler}>
        <div className="form_rows">
          <label htmlFor="club">Club Name</label>
          <input
            type="text"
            id="club"
            ref={clubNameInputRef}
            autoComplete="off"
            onChange={(e) => setTypedClubName(e.target.value)}
          />
        </div>
        <div className="form_rows">
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            ref={durationInputRef}
            autoComplete="off"
            min={0}
            step={0.5}
            onChange={(e) => setTypedDuration(e.target.value)}
          />
        </div>
        <div className="form_rows">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            ref={dateInputRef}
            autoComplete="off"
            onChange={(e) => {
              setTypedDate(e.target.value);
              checkBtnClickable();
            }}
          />
        </div>
        <button
          type="submit"
          className={
            btnClickable ? "btn_submit" : "btn_submit btn_submit-error"
          }
          disabled={!btnClickable}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
