import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BACKEND_PATH from "../env";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";

const ProductList = () => {
  const [products, setProducts] = useState("");
  const [auctionData, setAuctionData] = useState({});
  const [reversetime, setReverseTime] = useState({});
  const [endReversetime, setEndReverseTime] = useState({});

  // const navigate = useNavigate();

  //for getting the data from database
  const getProducts = async () => {
    let result = await fetch("http://localhost:8000/productList", {});
    result = await result.json();
    setProducts(result);
  };

  function startTimer(start_time, end_time, date) {
    const currentDate = new Date();
    const startDate = new Date(`${date}T${start_time}`);
    let timeDifference = startDate - currentDate;
    let count = timeDifference;
    setReverseTime(Math.floor(count));
  }

  function endTimer(start_time, end_time, date) {
    const startDate = new Date(`${date}T${start_time}`);
    const endDate = new Date(`${date}T${end_time}`);
    let duration = endDate - startDate;
    let endCount = duration;
    setEndReverseTime(Math.floor(endCount));
  }

  const getAuction = async () => {
    let result = await fetch(`http://localhost:8000/getAuction`, {});
    result = await result.json();
    console.log("🚀 ~ file: ProductList.js:51 ~ getAuction ~ result:", result);

    if (result.st === true) {
      const { start_time, end_time, date } = result?.data;
      startTimer(start_time, end_time, date);
      endTimer(start_time, end_time, date);
      setAuctionData(result);
    } else {
      alert("something goes wrong!!!");
    }
  };

  // const [herankarechhe, setherankarechhe] = useState(false);
  // const renderer = ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <span>You are good to go!</span>;
  //   } else {
  //     return (
  //       <span>
  //         <h1>Auction is Starting in</h1>={hours}:{minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };
  const renderer = React.useMemo(() => {
    return ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <span>You are good to go!</span>;
      } else {
        return (
          <span>
            <h1>Auction is Starting in</h1>={hours}:{minutes}:{seconds}
          </span>
        );
      }
    };
  }, []);

  // const endRenderer = React.useMemo(() => {
  //   ({ hours, minutes, seconds, completed }) => {
  //     if (completed) {
  //       return <span>Thank YOU!</span>;
  //     } else {
  //       return (
  //         <span>
  //           <h1>Auction is end in</h1>={hours}:{minutes}:{seconds}
  //         </span>
  //       );
  //     }
  //   };
  // });
  const endRenderer = React.useMemo(() => {
    return ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <span>Thank YOU!</span>;
      } else {
        return (
          <span>
            <h1>Auction is end in</h1>={hours}:{minutes}:{seconds}
          </span>
        );
      }
    };
  }, []);

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

      <Countdown date={Date.now() + reversetime} renderer={renderer} />
      <Countdown date={Date.now() + endReversetime} renderer={endRenderer} />

      <div>
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
                  {auctionData.data.isAuctionStarted === true ? (
                    <Link to={"/productbid/" + item.id}>Click for Bid</Link>
                  ) : (
                    "hello"
                  )}
                </li>
              </ul>
            ))
          ) : (
            <h1>No Result Found</h1>
          )
        }
      </div>
    </div>
  );
};

export default ProductList;
