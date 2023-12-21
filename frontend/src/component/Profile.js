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
      <h1>First Name:</h1>
      {user.result?.firstname}
      <h1>Last Name:</h1>
      {user.result?.lastname}
      <h1>mobile No:</h1>
      {user.result?.mobile}

      <table>
        <thead>
          <tr>
            <th colspan="3">
              <h1>Product List:</h1>
            </th>
          </tr>
          <tr>
            <th>
              <h2>Name</h2>
            </th>
            <th>
              <h2>Description</h2>
            </th>
            <th>
              <h2>Price</h2>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <ul> */}
          {user?.result?.productlist?.map((product) => (
            // <li key={product.id}>
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
            </tr>
            // </li>
          ))}
          {/* </ul> */}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
