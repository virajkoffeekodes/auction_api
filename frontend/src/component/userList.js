import React, { useEffect, useState } from "react";

const UserList = () => {
  const [user, setUser] = useState([]);
  const [start_time, setAuctionStartTime] = useState("");
  const [end_time, setAuctionEndTime] = useState("");
  const [date, setAuctionDate] = useState("");

  const setAuction = async (e) => {
    e.preventDefault();

    try {
      const data = {
        start_time,
        end_time,
        date,
      };
      let result = await fetch("http://localhost:8000/auction", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      alert(result.msg);
      console.log("🚀 ~ file: userList.js:14 ~ setAuction ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ file: userList.js:15 ~ setAuction ~ error:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  //for getting the data from database
  const getUser = async () => {
    let result = await fetch("http://localhost:8000/userList", {});
    result = await result.json();
    setUser(result);
  };
  console.log(user.data);
  return (
    <div>
      <h1>User List</h1>
      <div>
        <form onSubmit={setAuction}>
          <h4>start time </h4>
          <input
            className="inputbox"
            value={start_time}
            onChange={(e) => setAuctionStartTime(e.target.value)}
            type="time"
            placeholder="Enter start time"
          />
          <br />
          <h4>end time </h4>
          <input
            className="inputbox"
            value={end_time}
            onChange={(e) => setAuctionEndTime(e.target.value)}
            type="time"
            placeholder="Enter End time"
          />
          <br />
          <h4>Date </h4>
          <input
            className="inputbox"
            value={date}
            onChange={(e) => setAuctionDate(e.target.value)}
            type="date"
            placeholder="Enter Auction Date"
          />
          <br />
          <button type="submit" className="singupbtn">
            set Time
          </button>
        </form>
      </div>
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
