import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import ShoppingCart from "../cart/ShoppingCart";
import { FooterComponent } from "../footer/Footer";
import { MenuComponent } from "../menu/Menu";
import { ProductCartComponent } from "./ProductCartComponent";
import "./ProductDetails.css";

export function ProductDetailsComponent() {
  let { productId } = useParams();
  const productDetailsUrl = "http://localhost:3001/products";
  const [productDetails, setProductDetails] = useState([]);

  const [readMore, setReadMore] = useState(false);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${productDetailsUrl}/${productId}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((product) => {
        setProductDetails(product);
      });
  }, []);

  function deleteMovie() {
    if (auth.user.admin) {
      fetch(`${productDetailsUrl}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }).then(() => {
        navigate("/");
      });
    }
  }
  function editPoster() {
    navigate("./edit");
  }

  return (
    <>
      <MenuComponent />
      <section className="main">
        <section className="product-container">
          <img
            src={productDetails.Poster}
            className="product-image"
            alt="Product images"
          />

          <div className="product-details--wrapper">
            <h2 className="product-title">{productDetails.Title}</h2>
            <span>
              <i className="fa-sharp fa-solid fa-star"></i>
              <i className="fa-sharp fa-solid fa-star"></i>
              <i className="fa-sharp fa-solid fa-star"></i>
              <i className="fa-sharp fa-solid fa-star"></i>
            </span>
            <span className="unique-card">
              <p className="why-description">Why it's unique</p>
              <span>{productDetails.Unique}</span>
              <p className="why-description">Why it's a multitasker</p>
              {readMore
                ? productDetails.Multitasker
                : `${productDetails.Multitasker?.substring(0, 20)}...`}
              <p className="read-more" onClick={() => setReadMore(!readMore)}>
                {readMore ? "Read Less" : "Read More"}
              </p>
            </span>
            <ProductCartComponent
              Price={productDetails.Price}
              Currency={productDetails.Currency}
              id={productDetails.id}
              key={productDetails.id}
            ></ProductCartComponent>
          </div>
        </section>

        <div>
          {auth.user?.admin ? (
            <button onClick={deleteMovie} className="admin-btn delete-btn">
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
        <div>
          {auth.user?.admin ? (
            <button onClick={editPoster} className="admin-btn edit-btn">
              Edit
            </button>
          ) : (
            ""
          )}
        </div>
        {
          <div>
            {auth.user?.admin ? (
              <button
                onClick={() => navigate(`/create`)}
                className="admin-btn create-btn"
              >
                Create
              </button>
            ) : (
              ""
            )}
          </div>
        }
      </section>
      <FooterComponent />
    </>
  );
}
