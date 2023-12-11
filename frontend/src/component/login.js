import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // useeffect is ued to not show the singup after the login
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  });

  const handleLogin = async () => {
    try {
      let result = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ mobile, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();
      if (result.st === true) {
        localStorage.setItem("token", result.token);

        if (result.user.isAdmin === false) {
          localStorage.setItem("user", JSON.stringify(result.user)); //store the data
          localStorage.setItem("userId", JSON.stringify(result.user.id)); //store the data
          localStorage.setItem("token", JSON.stringify(result.auth));

          navigate("/"); //for user
          window.location.reload();
        } else {
          localStorage.setItem("user", JSON.stringify(result.user)); //store the data
          localStorage.setItem("token", JSON.stringify(result.auth));
          navigate("/userlist"); // for admin
          window.location.reload();
        }
      } else {
        alert("something goes wrong");
      }
    } catch (error) {
      console.log("🚀 ~ file: login.js:46 ~ handleLogin ~ error:", error);
    }
  };
  return (
    <div className="login">
      <h1>Login Page</h1>
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
      <button className="singupbtn" type="button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
