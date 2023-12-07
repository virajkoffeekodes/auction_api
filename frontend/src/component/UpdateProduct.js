import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getproduct();
  }, []);

  const getproduct = async () => {
    let result = await fetch(
      `http://localhost:8000/updateProduct/find/${params.id}`
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setDescription(result.description);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image); // Append the file object directly
    formData.append("price", price); // Append the file object directly

    formData.append("description", description);
    // console.log(name, price, description, image);
    let result = await fetch(
      `http://localhost:8000/updateProduct/update/${params.id}`,
      {
        method: "put",
        body: formData,
      }
    );
    result = await result.json();
    console.log(result);
    navigate("/");
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
