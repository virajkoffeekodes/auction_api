import React, { useEffect, useState } from "react";
import BACKEND_PATH from "../env";
import axios from "axios";
import Countdown from "react-countdown";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState("");

  const [liveOpen, setLiveOpen] = useState(true);
  const [ucOpen, setUcOpen] = useState(false);
  const [FilterProducts, setFilterProducts] = useState([]);
  const [FilterLive, setFilterLive] = useState([]);

  const getProducts = async () => {
    let result = await axios.get("http://localhost:8000/productList", {});
    setProducts(result.data);
    const filteredupcoming = result.data?.filter(
      (ele) => ele.isAuctionStarted === true
    );
    setFilterLive(filteredupcoming);
  };
  const currentDate = new Date();

  const reversetime = (start_Time, start_Date, end_Time, end_Date) => {
    const startDateTime = new Date(`${start_Date}T${start_Time}`);
    const endDateTime = new Date(`${end_Date}T${end_Time}`);
    const currentTime = new Date();

    if (currentTime >= startDateTime && currentTime <= endDateTime) {
      return endDateTime - currentTime;

      // setReverse(Math.floor(result));
    }
    return 0;
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Thank You.....</span>;
      // setDisplayTime(true);
    }
    return (
      <>
        <span>
          <h3>Auction is End in:</h3>
          {days}:{hours}:{minutes}:{seconds}
        </span>
        <br />
      </>
    );
  };

  //for search part
  const searchHandle = async (e) => {
    const key = e.target.value;
    // if (!key) {
    //   getProducts();
    // }
    // if (key.length > 0) {
    //   let result = await axios.get(`http://localhost:8000/search/${key}`, {});

    //   // result = await result.json();

    //   setProducts(result.data);
    // }
    if (!key) {
      getProducts(); // Call the getProducts function to fetch all products again
    } else if (key.length > 0) {
      try {
        let result = await axios.get(`http://localhost:8000/search/${key}`, {});
        setFilterLive(result.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        // Handle the error if the search request fails
      }
    }
  };

  const handleFilter = () => {
    setUcOpen(true);
    // console.log(products, "productssss");
    const filteredupcoming = products?.filter(
      (ele) => ele.isAuctionStarted === false
    );
    setFilterProducts(filteredupcoming);
    setLiveOpen(false);
  };

  const handleFilterLive = () => {
    setLiveOpen(true);
    const filteredupcoming = products?.filter(
      (ele) => ele.isAuctionStarted === true
    );
    setFilterLive(filteredupcoming);
    setUcOpen(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="product-list">
      <h1>ProductList</h1>
      <input type="text" placeholder="Search" onChange={searchHandle} />
      <br />
      <br />
      <button onClick={handleFilterLive}>Live</button>
      <button onClick={handleFilter}>Upcoming</button>

      {liveOpen ? (
        <>
          {FilterLive?.length > 0 ? (
            <ul>
              {FilterLive?.map((item, index) => (
                <>
                  {item.isCompleted ? (
                    ""
                  ) : (
                    <li key={item.id}>
                      <div>
                        <img
                          height={100}
                          width={100}
                          src={`${BACKEND_PATH}/${item.image}`}
                          alt=""
                        />
                      </div>
                      <ul>
                        <li>
                          <span>Name:</span> {item.name}
                        </li>
                        <li>Description: {item.description}</li>
                        <li>Price: {item.price}</li>
                        <li>
                          <span>Start Time:</span> {item.start_Time}
                        </li>
                        <li>
                          <span>Start Date:</span> {item.start_Date}
                        </li>
                        <li>
                          <span>End Time:</span> {item.end_Time}
                        </li>
                        <li>
                          <span>End Date:</span> {item.end_Date}
                        </li>
                        <li>
                          {currentDate ===
                            new Date(`${item.start_Date}T${item.start_Time}`) ||
                          (currentDate >
                            new Date(`${item.start_Date}T${item.start_Time}`) &&
                            currentDate <
                              new Date(`${item.end_Date}T${item.end_Time}`)) ? (
                            <>
                              <Countdown
                                date={
                                  Date.now() +
                                  reversetime(
                                    item.start_Time,
                                    item.start_Date,
                                    item.end_Time,
                                    item.end_Date
                                  )
                                }
                                renderer={renderer}
                                // displayTime={displayTime}
                              />
                              <br />
                              <Link to={"/productbid/" + item.id}>
                                Click for Bid
                              </Link>
                            </>
                          ) : (
                            "Auction not started yet!!"
                          )}
                        </li>
                      </ul>
                      <br />
                      <br />
                      <br />
                    </li>
                  )}
                </>
              ))}
            </ul>
          ) : (
            <h1>There are no live Auction</h1>
          )}
        </>
      ) : (
        ""
      )}

      {ucOpen ? (
        <>
          {FilterProducts?.length > 0 ? (
            <ul>
              {FilterProducts.map((item, index) => (
                <>
                  {item.isCompleted ? (
                    ""
                  ) : (
                    <li key={item.id}>
                      <div>
                        <img
                          height={100}
                          width={100}
                          src={`${BACKEND_PATH}/${item.image}`}
                          alt=""
                        />
                      </div>
                      <ul>
                        <li>
                          <span>Name:</span> {item.name}
                        </li>
                        <li>Description: {item.description}</li>
                        <li>Price: {item.price}</li>
                        <li>
                          <span>Start Time:</span> {item.start_Time}
                        </li>
                        <li>
                          <span>Start Date:</span> {item.start_Date}
                        </li>
                        <li>
                          <span>End Time:</span> {item.end_Time}
                        </li>
                        <li>
                          <span>End Date:</span> {item.end_Date}
                        </li>
                        <li>
                          {currentDate ===
                            new Date(`${item.start_Date}T${item.start_Time}`) ||
                          (currentDate >
                            new Date(`${item.start_Date}T${item.start_Time}`) &&
                            currentDate <
                              new Date(`${item.end_Date}T${item.end_Time}`)) ? (
                            <>
                              <Countdown
                                date={
                                  Date.now() +
                                  reversetime(
                                    item.start_Time,
                                    item.start_Date,
                                    item.end_Time,
                                    item.end_Date
                                  )
                                }
                                renderer={renderer}
                                // displayTime={displayTime}
                              />
                              <br />
                              <Link to={"/productbid/" + item.id}>
                                Click for Bid
                              </Link>
                            </>
                          ) : (
                            "Auction not started yet!!"
                          )}
                        </li>
                      </ul>
                      <br />
                      <br />
                      <br />
                    </li>
                  )}
                </>
              ))}
            </ul>
          ) : (
            <h1>There are no up coming Auction</h1>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductList;

// function startTimer(start_Time, start_Date, end_Date, end_Time) {
//   const currentDate = new Date();
//   const startDateTime = new Date(`${start_Date}T${start_Time}`);
//   const endDateTime = new Date(`${end_Date}T${end_Time}`);

//   if (currentDate >= startDateTime && currentDate <= endDateTime) {
//     const count = endDateTime - currentDate;
//     console.log("🚀 ~ file: ProductList.js:31 ~ startTimer ~ count:", count);
//     setReverseTime(Math.floor(count));
//   } else {
//     setReverseTime(0); // Set countdown to 0 if outside the countdown window
//   }
// }

// const handleCountDown = (end_Date, start_Date, end_Time, start_Time) => {
//   const endDateTime = new Date(`${end_Date}T${end_Time}`);
//   const startDateTime = new Date(`${start_Date}T${start_Time}`);
//   const currentTime = new Date(); // Current time
//   const timeRemaining = endDateTime - startDateTime;

//   if (timeRemaining > 0) {
//     const countdownInterval = setInterval(() => {
//       const time = endDateTime - startDateTime; // Recalculate remaining time
//       console.log(" timeRemaining:", timeRemaining);
//       const hours = Math.floor(
//         (time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((time % (1000 * 60)) / 1000);

//       if (timeRemaining > 0) {
//         setCountdown(
//           `${hours} hours ${minutes} minutes ${seconds} seconds remaining`
//         );
//         // Update countdown state with remaining time
//         // Update UI or perform actions based on the countdown
//       } else {
//         // console.log("Countdown ended");
//         setCountdown("Countdown ended");
//         clearInterval(countdownInterval); // Stop the interval when countdown ends
//         // Perform actions when countdown ends
//       }
//     }, 1000); // Update every second
//   } else {
//     console.log("Countdown has already ended");
//   }
// };
