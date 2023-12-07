import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";

const BidProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState();
  const [fetchedPrice, setFetchedPrice] = useState("");

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
    setFetchedPrice(result.price);
    setImage(`${BACKEND_PATH}/${result.image}`);
    setDescription(result.description);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();

    let result = await fetch(`http://localhost:8000/productbid/${params.id}`, {
      method: "put",
      body: JSON.stringify({ price }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();

    console.log(result);
    navigate("/");
  };

  return (
    <div>
      <h1>Bid Product</h1>
      <form>
        <div>
          <img src={image} height={100} width={100} alt="Product" />
        </div>
        <label>
          Name:
          <input
            value={name}
            name="name"
            // id="name"

            type="text"
            placeholder="Name"
          />
        </label>
        <label>
          DESCRIPTION:
          <input value={description} type="text" placeholder="description" />
        </label>
        <label>
          PRICE:
          <input
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="number"
            placeholder="price"
          />
        </label>
        {parseInt(price) > parseInt(fetchedPrice) ? (
          <button type="submit" onClick={(e) => handelUpdate(e)}>
            Submit
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default BidProduct;
