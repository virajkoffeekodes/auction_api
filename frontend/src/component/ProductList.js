import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BACKEND_PATH from "../env";
import { Link, useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState("");
  const [auctionData, setAuctionData] = useState({});
  const navigate = useNavigate();

  //for getting the data from database
  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/productList", {});
    result = await result.json();
    setProducts(result);
  };
  const getAuction = async () => {
    let result = await fetch(`http://localhost:8000/getAuction`, {});
    result = await result.json();
    console.log(" result:", result);
    setAuctionData(result);
  };
  console.log(auctionData);

  //for search part
  const searchHandle = async (e) => {
    let key = e.target.value;
    let token = localStorage.getItem("token");

    // if (token.startsWith('"') && token.endsWith('"')) {
    //   token = token.substring(1, token.length - 1);
    //   console.log(token);
    // }
    let result = await fetch(`http://localhost:8000/search/${key}`, {
      // let result = await fetch("http://localhost:7000/product", {
      headers: {
        Authorization: token,
      },
    });
    if (!key) {
      getProducts();
    }
    result = await result.json();
    console.log(result);
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
    getAuction();
  }, []);

  return (
    <div className="product-list">
      <h1>ProductList</h1>
      <input type="text" placeholder="Search" onChange={searchHandle} />
      {auctionData.data.start_time}-{auctionData.data.end_time}/
      {auctionData.data.date}
      {
        //for finding the data is present or not
        products.length > 0 ? (
          products.map((item, index) => (
            <ul key={item.id}>
              <li>
                <div>
                  <img
                    height={100}
                    width={100}
                    src={`${BACKEND_PATH}/${item.image}`}
                    alt=""
                  />
                </div>
                <li>Name:{item.name}</li>
                <li>Description:{item.description}</li>
                <li>Price:{item.price}</li>

                <Link to={"/productbid/" + item.id}>Click for Bid</Link>
              </li>
            </ul>
          ))
        ) : (
          <h1>No Result Found</h1>
        )
      }
    </div>
  );
};

export default ProductList;
