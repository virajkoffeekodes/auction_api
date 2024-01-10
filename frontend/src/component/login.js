import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("plz enter your Email"),
  password: Yup.string().min(6).max(8).required("plz enter your password"),
});

const Login = () => {
  // const [mobile, setMobile] = useState("");
  // const [password, setPassword] = useState("");
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        console.log(values);
        const data = {
          email: values.email,
          password: values.password,
        };

        const headers = {
          "Content-Type": "application/json",
        };

        let result = await axios.post(
          "http://localhost:8000/login",
          { data },
          {
            headers,
          }
        );

        // result = await result.json();
        console.log(result);
        if (result.data.st === true) {
          localStorage.setItem("token", result.data.token);
          console.log(
            "🚀 ~ file: login.js:29 ~ handleLogin ~ token:",
            result.data.token
          );

          if (result.data.user.isAdmin === false) {
            localStorage.setItem("user", JSON.stringify(result.data.user)); //store the data
            localStorage.setItem("userId", JSON.stringify(result.data.user.id)); //store the data
            localStorage.setItem("token", JSON.stringify(result.data.token));

            navigate("/"); //for user
            window.location.reload();
          } else {
            localStorage.setItem("user", JSON.stringify(result.data.user)); //store the data
            localStorage.setItem("token", JSON.stringify(result.data.token));
            navigate("/userlist"); // for admin
            window.location.reload();
          }
        } else {
          alert("invalid email or password");
        }
      },
    });

  const navigate = useNavigate();
  useEffect(() => {
    // useeffect is ued to not show the singup after the login
    const auth = localStorage.getItem("token");
    if (auth) {
      navigate("/");
    }
  });

  // const handleLogin = async () => {
  // try {
  //   let result = await fetch("http://localhost:8000/login", {
  //     method: "POST",
  //     body: JSON.stringify({ values }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   if (result.st === true) {
  //     localStorage.setItem("token", result.token);
  //     console.log(
  //       "🚀 ~ file: login.js:29 ~ handleLogin ~ token:",
  //       result.token
  //     );
  //     if (result.user.isAdmin === false) {
  //       localStorage.setItem("user", JSON.stringify(result.user)); //store the data
  //       localStorage.setItem("userId", JSON.stringify(result.user.id)); //store the data
  //       localStorage.setItem("token", JSON.stringify(result.auth));
  //       navigate("/"); //for user
  //       window.location.reload();
  //     } else {
  //       localStorage.setItem("user", JSON.stringify(result.user)); //store the data
  //       localStorage.setItem("token", JSON.stringify(result.auth));
  //       navigate("/userlist"); // for admin
  //       window.location.reload();
  //     }
  //   } else {
  //     alert("something goes wrong");
  //   }
  // } catch (error) {
  //   console.log("🚀 ~ file: login.js:46 ~ handleLogin ~ error:", error);
  // }
  // };
  return (
    <div className="login">
      <h1>Login Page</h1>
      <input
        className="inputbox"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        // value={lastname}
        // onChange={(e) => setLastname(e.target.value)}
        type="email"
        placeholder="email"
      />
      {errors.email && touched.email ? <p>{errors.email}</p> : null}

      <br />
      <input
        className="inputbox"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        // value={password}
        // onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Enter Password"
      />
      {errors.password && touched.password ? <p>{errors.password}</p> : null}

      <br />
      <button className="singupbtn" type="button" onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
};

export default Login;
