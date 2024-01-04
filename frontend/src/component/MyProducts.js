import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";
import axios from "axios";

const MyProducts = () => {
  const [user, setUser] = useState([]);
  const [modal, setmodal] = useState(false);
  const [allBidder, setAllBidder] = useState(false);
  console.log(
    "🚀 ~ file: MyProducts.js:10 ~ MyProducts ~ allBidder:",
    allBidder
  );

  const params = useParams();

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

  const modalOpen = async (id) => {
    setmodal(!modal);
    if (id) {
      let result = await axios.get(`http://localhost:8000/allbidder/${id}`);
      // console.log(result.data, "bWDwdf");
      setAllBidder(result.data);
      setmodal(true);
    }
  };

  const close = () => {
    setmodal(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {modal && (
        <div className="modal-product">
          <div className="listofbidder">
            <h2>List of all Bider</h2>
            {allBidder.length > 0
              ? allBidder.map((item, index) => (
                  <ul key={item.id}>
                    <li>
                      Firstname:{item.all.firstname}
                      <br />
                      Lastname:{item.all.lastname}
                    </li>
                    <br />
                  </ul>
                ))
              : "No Bidder"}
          </div>

          <div className="btn">
            {" "}
            <button onClick={close}>Done</button>{" "}
          </div>
        </div>
      )}
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
                {product.isAuctionStarted === false ? (
                  <>
                    <Link to={"/updateproduct/" + product.id}>update</Link>

                    <button onClick={() => deleteproduct(product.id)}>
                      Delete
                    </button>
                  </>
                ) : (
                  <button onClick={() => modalOpen(product.id)}>
                    All Bidder
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MyProducts;
