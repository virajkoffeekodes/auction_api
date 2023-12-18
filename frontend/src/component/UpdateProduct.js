import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const params = useParams();

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    let result = await axios.get(
      `http://localhost:8000/updateProduct/find/${params.id}`
    );
    // result = await result.json();
    setName(result.data.name);
    setPrice(result.data.price);
    setDescription(result.data.description);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image); // Append the file object directly
    formData.append("price", price); // Append the file object directly
    formData.append("description", description);
    formData.append("id", params.id);

    // console.log(name, price, description, image);
    let result = await axios.put(
      `http://localhost:8000/updateProduct/update`,
      formData
    );
    // result = await result.json();
    console.log(result.data);
    // navigate("/");
    // window.location.reload();
  };

  return (
    <div>
      <h1>update product</h1>
      <form>
        <label>
          Name:
          <input
            value={name}
            name="name"
            // id="name"
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
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        <button type="submit" onClick={(e) => handelUpdate(e)}>
          UpdateProduct
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
