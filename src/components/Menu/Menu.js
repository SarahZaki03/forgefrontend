import React, { useState } from "react";
import { Link } from "react-router-dom";

const Menu = (props) => {
  const [active, setActive] = useState("View all");

  const changeLink = (event) => {
    setActive(() => event.target.textContent);
  };

  return (
    <div className="bg-light d-flex set-gap middle-block rounded">
      {props.links.map((link) => (
        <div
          key={link}
          className={`map-btn ${active == link ? "active-rounded-btn" : ""}`}
          onClick={changeLink}
        >
          {link}
        </div>
      ))}
    </div>
  );
};

export default Menu;
