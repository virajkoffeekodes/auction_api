import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";
import axios from "axios";

const BidProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [bidprice, setBidPrice] = useState(0);
  const [newbidprice, setNewBidPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [allBidder, setAllBidder] = useState("");
  console.log("🚀 ~ file: Bidpage.js:13 ~ BidProduct ~ allBidder:", allBidder);
  const [image, setImage] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getproduct();
    allbidder();
  }, []);

  const allbidder = async () => {
    let result = await axios.get(
      `http://localhost:8000/allbidder/${params.id}`
    );
    console.log(result.data, "bWDwdf");
    setAllBidder(result.data);
  };

  const getproduct = async () => {
    let result = await axios.get(
      `http://localhost:8000/updateProduct/find/${params.id}`
    );
    // result = await result.json();
    setName(result.data.name);
    setPrice(result.data.price);
    setImage(`${BACKEND_PATH}/${result.data.image}`);
    setDescription(result.data.description);
    setNewBidPrice(result.data.bidprice);
    setBidPrice(result.data.bidprice);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    const info = localStorage.getItem("user");
    const user = JSON.parse(info);

    if (!info) {
      alert("Please login to bid.");
      return;
    }

    const bidderId = user.id;
    console.log(newbidprice, "fsfdsd");
    let updatebid = await axios.put(
      `http://localhost:8000/updatebid/${params.id}`,
      {
        bidprice,
      }
    );

    let result = await axios.put(
      `http://localhost:8000/productbid/${params.id}`,
      {
        bidprice,
        bidderId,
      }
    );

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
        <label>
          BID-PRICE:{bidprice === 0 || !bidprice ? price : newbidprice}
        </label>
        <br />
        <label>
          BID-PRICE:
          <input
            value={bidprice}
            onChange={(e) => setBidPrice(parseInt(e.target.value))}
            type="number"
            placeholder="Bid-Price"
          />
        </label>
        <br />
        {!bidprice ? bidprice > price : bidprice > newbidprice}

        {bidprice > newbidprice && bidprice > price ? (
          <button onClick={(e) => handelUpdate(e)}>Submit</button>
        ) : (
          "enter price gretter then BID-PRICE"
        )}
      </form>
      <br />
      <br />
      <br />
      <div>
        <h2>Latest Bidder</h2>
        <table>
          <thead>
            <tr>
              <th>First Name </th>
              <th>Last Name</th>
              <th>Bidded Price</th>
            </tr>
          </thead>
          <tbody>
            {allBidder.length > 0 ? (
              <>
                {allBidder.map((item, index) => (
                  <tr>
                    <td>{item.all.firstname}</td>
                    <td>{item.all.lastname}</td>
                    <td>{item.biddingPrice}</td>
                  </tr>
                ))}
              </>
            ) : (
              ""
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BidProduct;
