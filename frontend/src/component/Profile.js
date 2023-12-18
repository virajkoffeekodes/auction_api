import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState([]);
  const params = useParams();

  const getUser = async () => {
    let result = await axios.get(
      `http://localhost:8000/profile/find/${params.id}`,
      {}
    );
    // result = await result.json();
    setUser(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h1>profile</h1>
      <h1>First Name</h1>={user.result?.firstname}
      <h1>Last Name</h1>={user.result?.lastname}
      <h1>mobile No</h1>={user.result?.mobile}
      <div>
        <h1>Product List</h1>=
        <ul>
          {user?.result?.productlist?.map((product) => (
            <li key={product.id}>
              <h2>Name={product.name}</h2>
              <p>Description={product.description}</p>
              <p>Price: {product.price}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
