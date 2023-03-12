import "./App.css";
import { NavbarComponent } from "./pages/navbar/NavbarComponent.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetailsComponent } from "./pages/product-details/ProductDetailsComponent";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Profile } from "./pages/profile/Profile";
import { AuthContextProvider } from "./pages/login/auth-context";
import React, { useState } from "react";
import { ShopAll } from "./pages/shop/ShopAll";
import { ProductEditComponent } from "./pages/product-edit/ProductEditComponent";
import ProductCart from "./pages/cart/ShoppingCart";
import ShoppingCart from "./pages/cart/ShoppingCart";

// import {Modal} from "./pages/navbar/modal/Modal.jsx";
// SPA - single page application

export const AuthContext = React.createContext();
function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          {/* <Route path="/cart" element={<ProductCart />}></Route> */}
          <Route path="/" element={<NavbarComponent />}></Route>
          <Route path="shop" element={<ShopAll />}></Route>
          <Route
            path="/product-details/:productId"
            element={<ProductDetailsComponent />}
          ></Route>
          <Route
            path="/product-details/:productId/edit"
            element={<ProductEditComponent />}
          ></Route>
          <Route
            path="/create"
            element={<ProductEditComponent formType="create" />}
          ></Route>
          <Route path="/cart" element={<ShoppingCart />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
