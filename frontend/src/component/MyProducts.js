import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BACKEND_PATH from "../env";

const MyProducts = () => {
  const [user, setUser] = useState([]);

  const params = useParams();

  const getUser = async () => {
    let result = await fetch(
      `http://localhost:8000/profile/find/${params.id}`,
      {}
    );
    result = await result.json();
    setUser(result);
  };

  const deleteproduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    window.location.reload();
  };

  useEffect(() => {
    getUser();
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
              <Link to={"/updateproduct/" + product.id}>update</Link>
              <button onClick={() => deleteproduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyProducts;
