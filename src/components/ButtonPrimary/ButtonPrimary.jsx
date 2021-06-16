import React from "react";
import "./ButtonPrimary.scss";

function ButtonPrimary({ handleLogin, label }) {
  return (
    <>
      <button className="button-primary" onClick={handleLogin}>
        {label}
      </button>
    </>
  );
}

export default ButtonPrimary;
