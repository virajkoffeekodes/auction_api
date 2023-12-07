import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  // const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // Store file object, not file path
  const navigate = useNavigate();

  const productSubmit = async (e) => {
    e.preventDefault();

    const auth = localStorage.getItem("user");
    const abc = JSON.parse(auth);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image); // Append the file object directly
    formData.append("price", price); // Append the file object directly
    formData.append("id", abc.id); // Append the file object directly
    formData.append("description", description); // Append the file object directly

    try {
      let result = await fetch("http://localhost:8000/addProduct", {
        method: "POST",
        body: formData, // Use formData directly as the body
        // No need to set Content-Type, browser will set as 'multipart/form-data'
      });

      console.log("Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
    navigate("/");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file); // Store the selected file object
  };

  return (
    <div>
      <h1>AddProduct</h1>
      <form onSubmit={productSubmit}>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
        </label>
        <br />
        <label>
          PRICE:
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="price"
          />
        </label>
        <br />
        <label>
          DESCRIPTION:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
          />
        </label>
        <br />
        <label>
          Image:
          <input onChange={handleFileChange} type="file" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
