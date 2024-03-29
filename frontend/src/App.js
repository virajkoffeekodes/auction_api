import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./component/navbar";
import Login from "./component/login";
import Registretion from "./component/Registretion";
import PrivateComponent from "./component/PrivateComponent";
import ProductList from "./component/ProductList";
import AddProduct from "./component/AddProduct";
import UpdateProduct from "./component/UpdateProduct";
import Profile from "./component/Profile";
import UserList from "./component/userList";
import Bidpage from "./component/Bidpage";
import MyProducts from "./component/MyProducts";
// import Logout from "./component/logout";
import "../src/App.css";
import Bidderinfo from "./component/Bidderinfo";
import Paymentpage from "./component/paymentpage";

function App() {
  console.log(ProductList);
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/myproducts/:id" element={<MyProducts />} />
            <Route path="/payment" element={<Paymentpage />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/productbid/:id" element={<Bidpage />} />
            {/* <Route path="/allbidder/:id" element={<Bidderinfo />} /> */}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registretion />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
