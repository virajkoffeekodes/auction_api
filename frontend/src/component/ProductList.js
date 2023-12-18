import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import BACKEND_PATH from "../env";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Countdown from "react-countdown";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState("");
  const [auctionData, setAuctionData] = useState({});
  const [reversetime, setReverseTime] = useState({});
  const [endReversetime, setEndReverseTime] = useState({});
  // const [displayTime, setDisplayTime] = useState(false);
  const [modal, setmodal] = useState(false);
  const [allBidder, setAllBidder] = useState(false);
  const [display, setDisplay] = useState(true);
  const params = useSearchParams();
  // const navigate = useNavigate();

  //for getting the data from database
  const getProducts = async () => {
    let result = await axios.get("http://localhost:8000/productList", {});
    setProducts(result.data);
  };
  const getAuction = async () => {
    let result = await axios.get(`http://localhost:8000/getAuction`, {});
    // result = await result.json();
    // console.log("🚀 ~ file: ProductList.js:26 ~ getAuction ~ result:", result);

    if (result.data.st === true) {
      const { start_time, end_time, date, isCompleted } = result?.data?.data;
      if (isCompleted === true) {
        setDisplay(false);
      }

      if (!isCompleted) {
        startTimer(start_time, end_time, date);
        endTimer(start_time, end_time, date);
      }
      setAuctionData(result);
    } else {
      alert("something goes wrong!!!");
    }
  };

  function startTimer(start_time, end_time, date) {
    const currentDate = new Date();
    const startDate = new Date(`${date}T${start_time}`);
    let count = startDate - currentDate;
    setReverseTime(Math.floor(count));
  }

  const endTimer = async (start_time, end_time, date) => {
    const currentTimeStamp = new Date();
    // const startDate = new Date(`${date}T${start_time}`);
    const endDate = new Date(`${date}T${end_time}`);
    let endCount = endDate - currentTimeStamp;
    setEndReverseTime(Math.floor(endCount));
  };

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span> Your good to go!!</span>;
      // setDisplayTime(true);
    }
    return (
      <span>
        <h1>Auction is Starting in:</h1>
        {hours}:{minutes}:{seconds}
      </span>
    );
  };

  const endRenderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span>Thank YOU!</span>;
    } else {
      return (
        <span>
          <h1>Auction is end in</h1>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  //for search part
  const searchHandle = async (e) => {
    const key = e.target.value;
    if (!key) {
      getProducts();
    }
    if (key.length > 0) {
      let result = await axios.get(`http://localhost:8000/search/${key}`, {});

      // result = await result.json();

      setProducts(result.data);
    }
  };

  const modalOpen = async (id) => {
    setmodal(!modal);
    if (id) {
      let result = await axios.get(`http://localhost:8000/allbidder/${id}`);
      console.log(result.data, "bWDwdf");
      setAllBidder(result.data);
      setmodal(true);
    }
  };

  const close = () => {
    setmodal(false);
  };

  useEffect(() => {
    getProducts();
    getAuction();
  }, []);

  console.log("🚀 allBidder:", allBidder);
  return (
    <div className="product-list">
      {modal && (
        <div className="modal-product">
          {allBidder.length > 0
            ? allBidder.map((item, index) => (
                <ul>
                  <li>
                    Firstname:{item.firstname}
                    <br />
                    Lastname:{item.lastname}
                  </li>
                  <br />
                </ul>
              ))
            : "No Bidder"}
          <div>
            {" "}
            <button onClick={close}>Done</button>{" "}
          </div>
        </div>
      )}
      <h1>ProductList</h1>
      <input type="text" placeholder="Search" onChange={searchHandle} />
      {display ? (
        <div>
          <Countdown
            date={Date.now() + reversetime}
            renderer={renderer}
            // displayTime={displayTime}
          />
          <Countdown
            date={Date.now() + endReversetime}
            renderer={endRenderer}
          />
        </div>
      ) : (
        "Thank You For jioning.."
      )}

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
                  {auctionData?.data?.data?.isAuctionStarted === true ? (
                    <Link to={"/productbid/" + item.id}>Click for Bid</Link>
                  ) : (
                    ("Auction not started yet!!",
                    (
                      <button onClick={() => modalOpen(item.id)}>
                        All Bidder
                        {/* <Link to={"/allbidder/" + item.id}>All Bidder</Link> */}
                      </button>
                    ))
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
