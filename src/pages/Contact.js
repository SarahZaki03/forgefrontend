import React from "react";
import Header from "../components/Header/Header";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    result = await result.json();
    console.warn("Error", result);

    if (result) {
      alert("Data saved succesfully");
      setEmail("");
      setName("");
    }
  };

  return (
    <div>
      <Header />
      <h1>This is React WebApp </h1>
      <form action="">
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" onClick={handleOnSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
