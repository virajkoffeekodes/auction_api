import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";
import axios from "axios";

const MyProducts = () => {
  const [user, setUser] = useState([]);
  const [auctionData, setAuctionData] = useState({});

  const params = useParams();

  const getAuction = async () => {
    let result = await axios.get(`http://localhost:8000/getAuction`, {});
    // console.log("🚀 ~ file: ProductList.js:26 ~ getAuction ~ result:", result);

    setAuctionData(result);
  };

  const getUser = async () => {
    let result = await axios.get(
      `http://localhost:8000/profile/find/${params.id}`,
      {}
    );
    // result = await result.json();
    setUser(result.data);
  };

  const deleteproduct = async (id) => {
    console.log(id);
    let result = await axios.delete(`http://localhost:8000/delete/${id}`, {
      // method: "Delete",
    });
    // result = await result.json();
    window.location.reload();
  };

  useEffect(() => {
    getUser();
    getAuction();
  }, []);

  return (
    <div>
      <h1>My Products</h1>
      <div>
        <h1>Product List</h1>=
        <ul>
          {user?.result?.productlist?.map((product) => (
            <li key={product.id}>
              <div>
                <img
                  height={100}
                  width={100}
                  src={`${BACKEND_PATH}/${product.image}`}
                  alt=""
                />
              </div>
              <h2>Name={product.name}</h2>
              <p>Description={product.description}</p>
              <p>Price: {product.price}</p>
              {auctionData?.data?.data?.isAuctionStarted === false ? (
                <>
                  <Link to={"/updateproduct/" + product.id}>update</Link>

                  <button onClick={() => deleteproduct(product.id)}>
                    Delete
                  </button>
                </>
              ) : (
                "Aucion started you can't update the product"
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProducts;
