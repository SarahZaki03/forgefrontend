import React from "react";

const Button = (props) => {
  const buttonClickedHandler = () => {
    console.log("Clicked");
  };
  return (
    <div>
      <button type={props.type} onClick={buttonClickedHandler}>
        {props.title}
      </button>
    </div>
  );
};

export default Button;
