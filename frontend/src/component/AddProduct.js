import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  price: "",
  description: "",
  end_Date: "",
  end_Time: "",
  start_Date: "",
  start_Time: "",
  image: null,
};

const signUpSchema = Yup.object({
  name: Yup.string().required("plz enter  name"),
  price: Yup.string().required("plz enter  price"),
  description: Yup.string().required("plz enter  description"),
  end_Date: Yup.string().required("plz enter  end_Date"),
  end_Time: Yup.string().required("plz enter  end_Time"),
  start_Date: Yup.string().required("plz enter  start_Date"),
  start_Time: Yup.string().required("plz enter  start_Time"),
  image: Yup.mixed().required("Please select an image"),
});
const AddProduct = () => {
  // const [name, setName] = useState("");
  // const [id, setId] = useState("");
  // const [price, setPrice] = useState("");
  // const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store file object, not file path
  // const [start_Time, setAuctionStart_Time] = useState("");
  // const [start_Date, setAuctionstart_Date] = useState("");
  // const [end_Time, setAuctionEnd_Time] = useState("");
  // const [end_Date, setAuctionEnd_Date] = useState("");
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const abc = JSON.parse(auth);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("image", image); // Append the file object directly
        formData.append("price", values.price); // Append the file object directly
        formData.append("id", abc.id); // Append the file object directly
        formData.append("description", values.description); // Append the file object directly
        formData.append("start_Time", values.start_Time); // Append the file object directly
        formData.append("start_Date", values.start_Date); // Append the file object directly
        formData.append("end_Time", values.end_Time); // Append the file object directly
        formData.append("end_Date", values.end_Date); // Append the file object directly

        try {
          let result = await axios.post(
            "http://localhost:8000/addProduct",
            formData
          );

          console.log("Result:", result.data);
        } catch (error) {
          console.error("Error:", error);
        }
        navigate("/");
      },
    });

  // const productSubmit = async (e) => {
  //   e.preventDefault();

  //   // const formData = new FormData();
  //   // formData.append("name", name);
  //   // formData.append("image", image); // Append the file object directly
  //   // formData.append("price", price); // Append the file object directly
  //   // formData.append("id", abc.id); // Append the file object directly
  //   // formData.append("description", description); // Append the file object directly
  //   // formData.append("start_Time", start_Time); // Append the file object directly
  //   // formData.append("start_Date", start_Date); // Append the file object directly
  //   // formData.append("end_Time", end_Time); // Append the file object directly
  //   // formData.append("end_Date", end_Date); // Append the file object directly

  //   // try {
  //   //   let result = await axios.post(
  //   //     "http://localhost:8000/addProduct",
  //   //     formData
  //   //   );

  //   //   console.log("Result:", result.data);
  //   // } catch (error) {
  //   //   console.error("Error:", error);
  //   // }
  //   // navigate("/");
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the selected file object
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>AddProduct</h1>

      <form>
        <label>
          Name:
          <input
            className="inputbox"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Name"
          />
          {errors.name && touched.name ? <p>{errors.name}</p> : null}
        </label>
        <br />
        <label>
          PRICE:
          <input
            className="inputbox"
            name="price"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            placeholder="price"
          />
          {errors.price && touched.price ? <p>{errors.price}</p> : null}
        </label>
        <br />
        <label>
          Description:
          <input
            className="inputbox"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            placeholder="Description"
          />
          {errors.description && touched.description ? (
            <p>{errors.description}</p>
          ) : null}
        </label>
        <br />
        <label>
          Image:
          <input
            name="image"
            onChange={handleFileChange}
            type="file"
            onBlur={handleBlur}
          />
          {errors.image && touched.image && <p>{errors.image}</p>}
        </label>
        <br />
        <label>
          start Time:
          <input
            className="inputbox"
            name="start_Time"
            value={values.start_Time}
            onChange={handleChange}
            onBlur={handleBlur}
            type="time"
            placeholder="Name"
          />
          {errors.start_Time && touched.start_Time ? (
            <p>{errors.start_Time}</p>
          ) : null}
        </label>
        <br />
        <label>
          start Date:
          <input
            className="inputbox"
            name="start_Date"
            value={values.start_Date}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            placeholder="Name"
          />
          {errors.start_Date && touched.start_Date ? (
            <p>{errors.start_Date}</p>
          ) : null}
        </label>
        <br />
        <label>
          End Time:
          <input
            className="inputbox"
            name="end_Time"
            value={values.end_Time}
            onChange={handleChange}
            onBlur={handleBlur}
            type="time"
            placeholder="Name"
          />
          {errors.end_Time && touched.end_Time ? (
            <p>{errors.end_Time}</p>
          ) : null}
        </label>
        <br />
        <label>
          End Date:
          <input
            className="inputbox"
            name="end_Date"
            value={values.end_Date}
            onChange={handleChange}
            onBlur={handleBlur}
            type="date"
            placeholder="Name"
          />
          {errors.end_Date && touched.end_Date ? (
            <p>{errors.end_Date}</p>
          ) : null}
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
