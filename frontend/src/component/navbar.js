import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth !== undefined && auth !== "undefined") {
      const userData = JSON.parse(auth);
      if (userData?.isAdmin === true) {
        setAdmin(true);
      }
      setUser(userData);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      {user ? (
        admin ? (
          <ul>
            <li>
              <Link to="/userlist">user list</Link>
            </li>
            <li>
              <Link to={"/login"} onClick={logout}>
                logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addproduct">Add Product</Link>
            </li>
            <li>
              <Link to={"/myproducts/" + user.id}>My Products</Link>
            </li>

            <li>
              <Link to={"/profile/" + user.id}>Profile</Link>
            </li>
            <li>
              <Link to={"/signup"} onClick={logout}>
                logout
              </Link>
            </li>
          </ul>
        )
      ) : (
        <ul>
          <li>
            <Link onClick={logout}>logout</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
      {/* {auth ? (
        admin ? (
          <ul>
            <li>
              <Link to="/">Products</Link>
            </li>
            <li>
              <Link to="/addproduct">Add Product</Link>
            </li>
            <li>
              <Link to="/updateproduct">update Product</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link onClick={logout}>logout</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/userlist">user list</Link>
            </li>
            <li>
              <Link onClick={logout}>logout</Link>
            </li>{" "}
          </ul>
        )
      ) : (
        <ul>
          <li>
            <Link onClick={logout}>logout</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/signin">signin</Link>
          </li>
        </ul>
      )} */}
    </div>
  );
};

export default Navbar;
