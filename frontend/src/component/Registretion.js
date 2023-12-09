import React, { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    // const auth = localStorage.getItem("user");
    // const userdata = json.parse(auth);
    console.log(
      "🚀 ~ file: Registretion.js:14 ~ useEffect ~ userdata:"
      // userdata
    );
    // if (auth) {
    //   navigate("/");
    // }
  });

  const submit = async () => {
    // console.log(firstname, mobile, password);
    let result = await fetch("http://localhost:8000/signup", {
      method: "POST",
      body: JSON.stringify({ firstname, lastname, mobile, password }), //data is storedin boody
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));
    // localStorage.setItem("token", JSON.stringify(result.auth));
    if (result) {
      navigate("/login");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>

      <input
        className="inputbox"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        type="text"
        placeholder="firstname"
      />
      <br />
      <input
        className="inputbox"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        type="text"
        placeholder="lastname"
      />
      <br />
      <input
        className="inputbox"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        type="text"
        placeholder="Enter mobile"
      />
      <br />
      <input
        className="inputbox"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter Password"
      />
      <br />
      <button className="singupbtn" type="button" onClick={submit}>
        Sing Up
      </button>
    </div>
  );
};

export default Signup;
