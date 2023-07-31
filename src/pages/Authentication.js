import React from "react";
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import Header from "../components/Header/Header";

const Authentication = () => {
  console.log("authentication");
  return (
    <div>
      <Header />
      <AuthForm />
    </div>
  );
};

export default Authentication;

// -------------------------------------------------------------
// -------------------------------------------------------------
// Register and Login Actions:
// -------------------------------------------------------------
// -------------------------------------------------------------

export async function action({ request }) {
  // const searchParams = new URL(request.url).searchParams;
  console.log("action here");
  const data = await request.formData();
  console.log(data);
  console.log("formdata");
  const authData = {
    name: "Sarah",
    email: data.get("email"),
    password: data.get("password"),
  };
  console.log(authData.name, authData.email);
  const isLogin = data.get("mode");
  let mode = isLogin ? "login" : "signup";

  if (mode !== "login" && mode !== "signup") {
    mode = "signup";
  }

  const response = await fetch(`http://localhost:8080/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { statue: 500 });
  }

  // If user pass all the last conditions, then the login did succeed
  // soon: manage that token
  const resData = await response.json();
  const token = resData.token;

  localStorage.setItem("token", token);

  return redirect("/");
}
