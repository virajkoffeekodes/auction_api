import axios from "axios";
import React, { useState } from "react";
import StripeChekout from "react-stripe-checkout";

const Paymentpage = () => {
  const [products, setProducts] = useState("");

  const makePayment = (token) => {
    const body = {
      token,
    };
  };

  const getproductprice = async () => {
    let result = await axios.get("http://localhost:8000/produtbidprice");
    console.log(
      "🚀 ~ file: paymentpage.js:16 ~ getproductprice ~ result:",
      result
    );
  };
  console.log(
    "🚀 ~ file: paymentpage.js:15 ~ getproductprice ~ getproductprice:",
    getproductprice
  );

  return (
    <div>
      <StripeChekout
        stripeKey={process.env.REACT_APP_KEY}
        token={makePayment}
        name="Buy Product"
      >
        <button> Pay {}</button>
      </StripeChekout>
    </div>
  );
};

export default Paymentpage;
