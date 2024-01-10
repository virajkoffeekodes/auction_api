import React, { useState } from "react";
import { json, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const initialValues = {
  firstname: "",
  lastname: "",
  mobile: "",
  email: "",
  password: "",
  confirm_password: "",
};

const signUpSchema = Yup.object({
  firstname: Yup.string().min(3).max(15).required("plz enter your firstname"),
  lastname: Yup.string().min(3).max(15).required("plz enter your lastname"),
  mobile: Yup.string().min(10).max(10).required("plz enter your mobile number"),
  email: Yup.string()
    .email("Invalid email format")
    .required("plz enter your Email"),
  password: Yup.string().min(6).max(8).required("plz enter your password"),
  confirm_password: Yup.string()
    .required("plz enter your confirm_password")
    .oneOf([Yup.ref("password")]),
});

const Signup = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        const data = {
          firstname: values.firstname,
          lastname: values.lastname,
          mobile: values.mobile.toString(),
          email: values.email,
          password: values.password,
          confirm_password: values.confirm_password.toString(),
        };
        console.log(data);
        let result = await axios.post("http://localhost:8000/signup", { data });

        // result = await result.json();
        console.log(result.data, "result");
        localStorage.setItem("user", JSON.stringify(result.data.user));
        if (result) {
          navigate("/login");
        }
      },
    });

  // const submit = async () => {
  //   console.log("wmwc wa ");
  //   let result = await fetch("http://localhost:8000/signup", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       values,
  //       // firstname,
  //       // lastname,
  //       // mobile,
  //       // password,
  //       // confirm_password,
  //     }), //data is storedin boody
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   result = await result.json();
  //   console.log(result);
  //   localStorage.setItem("user", JSON.stringify(result.result));
  //   localStorage.setItem("token", JSON.stringify(result.auth));
  //   if (result) {
  //     navigate("/login");
  //   }
  // };

  return (
    <form>
      <div className="register">
        <h1>Register</h1>
        <input
          className="inputbox"
          name="firstname"
          value={values.firstname}
          onChange={handleChange}
          onBlur={handleBlur}
          // onChange={(e) => setFirstname(e.target.value)}
          type="text"
          placeholder="firstname"
        />
        {errors.firstname && touched.firstname ? (
          <p>{errors.firstname}</p>
        ) : null}
        <br />
        <input
          className="inputbox"
          name="lastname"
          value={values.lastname}
          onChange={handleChange}
          onBlur={handleBlur}
          // value={lastname}
          // onChange={(e) => setLastname(e.target.value)}
          type="text"
          placeholder="lastname"
        />
        {errors.lastname && touched.lastname ? <p>{errors.lastname}</p> : null}
        <br />
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
          name="mobile"
          value={values.mobile}
          onChange={handleChange}
          onBlur={handleBlur}
          // value={mobile}
          // onChange={(e) => setMobile(e.target.value)}
          type="number"
          placeholder="Enter mobile"
        />
        {errors.mobile && touched.mobile ? <p>{errors.mobile}</p> : null}
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
        <input
          className="inputbox"
          name="confirm_password"
          value={values.confirm_password}
          onChange={handleChange}
          onBlur={handleBlur}
          // value={confirm_password}
          // onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Enter Password"
        />
        {errors.confirm_password && touched.confirm_password ? (
          <p>{errors.confirm_password}</p>
        ) : null}
        <br />
        <button className="singupbtn" type="button" onClick={handleSubmit}>
          Sing Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
