import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";

const BidProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [bidprice, setBidPrice] = useState(0);
  const [newbidprice, setNewBidPrice] = useState(0);
  console.log(
    "🚀 ~ file: Bidpage.js:10 ~ BidProduct ~ newbidprice:",
    newbidprice
  );

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
    console.log("🚀 ~ file: Bidpage.js:25 ~ getproduct ~ result:", result);

    setName(result.name);
    setPrice(result.price);
    setFetchedPrice(result.price);
    setImage(`${BACKEND_PATH}/${result.image}`);
    setDescription(result.description);
    setNewBidPrice(result.bidprice);
    // setBidPrice(result.bidprice);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    const info = localStorage.getItem("user");
    const user = JSON.parse(info);

    if (!info) {
      alert("Please login to bid.");
      return;
    }
    // console.log(" parseInt(sfasf.id):", parseInt(user.id));

    const bidderId = user.id;
    console.log(newbidprice, "fsfdsd");
    let updatebid = await fetch(
      `http://localhost:8000/updatebid/${params.id}`,
      {
        method: "put",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({ bidprice }),
      }
    );
    updatebid = await updatebid.json();

    // console.log(updatebid, "update bid");
    let result = await fetch(`http://localhost:8000/productbid/${params.id}`, {
      method: "put",
      body: JSON.stringify({ bidprice, bidderId }),
      headers: {
        "content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result, "kwhkagkag");
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
          {name}
        </label>
        <br />
        <label>
          DESCRIPTION:
          {description}
        </label>
        <br />
        <label>PRICE:{price}</label>
        <br />
        <label>BID-PRICE:{newbidprice}</label>
        <br />
        <label>
          BID-PRICE:
          <input
            value={newbidprice}
            onChange={(e) => setBidPrice(parseInt(e.target.value))}
            type="number"
            placeholder="Bid-Price"
          />
        </label>
        <br />
        {parseInt(bidprice) > parseInt(newbidprice) ? (
          <button onClick={(e) => handelUpdate(e)}>Submit</button>
        ) : (
          "enter price gretter then BID-PRICE"
        )}
      </form>
    </div>
  );
};

export default BidProduct;
