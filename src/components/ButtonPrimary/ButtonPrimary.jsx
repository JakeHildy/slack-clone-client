import React from "react";
import "./ButtonPrimary.scss";

function ButtonPrimary({ handleLogin }) {
  return (
    <>
      <button className="button-primary" onClick={handleLogin}>
        Login
      </button>
    </>
  );
}

export default ButtonPrimary;
