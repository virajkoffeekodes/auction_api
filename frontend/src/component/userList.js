import axios from "axios";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [user, setUser] = useState([]);
  const [modal, setmodal] = useState(false);
  const [highbider, setHighbider] = useState("");

  const modalOpen = async (id) => {
    setmodal(!modal);
    if (id) {
      setmodal(true);

      let highestbid = await axios.get(
        `http://localhost:8000/highestbidder/${id}`
      );

      setHighbider(highestbid);
    }
  };

  const close = () => {
    setmodal(false);
  };

  //for getting the data from database
  const getUser = async () => {
    let result = await axios.get("http://localhost:8000/userList", {});
    // console.log("🚀 ~ file: userList.js:42 ~ getUser ~ result:", result);
    // result = await result.json();
    setUser(result.data);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div>
      <h1>User List</h1>
      {modal && (
        <div className="modal-product">
          <div className="HighestBider">
            <h1>Highest Bider</h1>
            <h4>First Name:-{highbider?.data?.firstname}</h4>
            <h4>Last Name:-{highbider?.data?.lastname}</h4>
            <h4>mobile No:-{highbider?.data?.mobile}</h4>
          </div>

          <div className="btn">
            {" "}
            <button onClick={close}>Done</button>{" "}
          </div>
        </div>
      )}

      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name </th>
            <th>Last Name</th>
            <th>Mobile</th>
            <th>product</th>
          </tr>
        </thead>
        <tbody>
          {user?.data?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.mobile}</td>
              <td>
                {user.productlist && user.productlist.length > 0 ? (
                  <ul>
                    {user.productlist.map((product) => (
                      <li key={product.id}>
                        Name: {product.name}, Description: {product.description}
                        , Price: {product.price}
                        <br />
                        <button onClick={() => modalOpen(product.id)}>
                          Highest Bidder
                          {/* <Link to={"/allbidder/" + item.id}>All Bidder</Link> */}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  "No products"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
