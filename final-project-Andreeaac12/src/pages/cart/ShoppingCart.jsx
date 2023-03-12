import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { P } from "react-html5video/dist";
import { AuthContext } from "../../App";
import { FooterComponent } from "../footer/Footer";
import { MenuComponent } from "../menu/Menu";
import "./ShoppingCart.css";

export default function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const [productsInCart, setCartProducts] = useState([]);
  const shoppingCartUrl = "http://localhost:3001/cart";
  const productsCartUrl = "http://localhost:3001/products";
  const [cartCount, setCartCount] = useState(0);
  const { auth } = useContext(AuthContext);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    fetch(shoppingCartUrl)
      .then((response) => response.json())
      .then((cartList) => {
        const [cart] = cartList;

        // Get the cart products separately
        const cartProducts = cart.products.map((cartProduct) => ({
          productId: cartProduct.productId,
          Quantity: cartProduct.quantity,
        }));
        setCartProducts(cartProducts);

        fetch(productsCartUrl, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((products) => {
            const cartProductsWithDetails = [];
            let totalPrice = 0;

            for (const product of products) {
              const cartProduct = cartProducts.find(
                (cartProduct) => cartProduct.productId === product.id
              );

              if (cartProduct) {
                cartProductsWithDetails.push({
                  ...product,
                  Quantity: cartProduct.Quantity,
                });
                totalPrice += Number(
                  (product.Price * cartProduct.Quantity).toFixed(2)
                );
                setPrice(totalPrice);
              }
            }

            setProducts(cartProductsWithDetails);
            setCartCount(cartProducts.length);
          });
      });
  }, []);

  function deleteMovie(productId) {
    // Send a DELETE request to the server to delete the product from the cart
    fetch(`http://localhost:3001/cart/1/products/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the products list to remove the deleted product
        const updatedProducts = products.filter((p) => p.id !== productId);
        setProducts(updatedProducts);

        // Update the cart products list after deleting the product
        const updatedCartProducts = productsInCart.filter(
          (p) => p.productId !== productId
        );
        setCartProducts(updatedCartProducts);

        // Update the cart count
        setCartCount(updatedCartProducts.length);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <MenuComponent />
<section className="main">
      <section className="main-container">
        <div className="badge-cart">
          <h1>Cart</h1>
          <span className="badge">{cartCount} </span>
        </div>
        {products.map((product) => (
          <>
            <div key={product.id}>
              <ul className="container-shop">
                <li className="box-shop">
                  <img
                    src={product.Poster}
                    className="img"
                    alt="Product poster"
                    width="150px"
                  />

                  <p className="product-details">{product.Title}</p>
                  <p className="product-details">
                    {product.Price} {product.Currency}
                  </p>

                  <p>Quantity {product.Quantity} </p>
                </li>
              </ul>
              <button
                className="btn-delete"
                onClick={() => deleteMovie(product.id)}
              >
                <i className="fa-solid fa-x"></i> Delete
              </button>
            </div>
            <div></div>
          </>
        ))}
      </section>
      
      </section>
      <section className="sum-btn">
        <div className="summary">
          <h3>Summary</h3>
          <div className="total-price">
            <p>Total price:</p>
            <p>{price} EUR</p>
          </div>
          <button className="checkout">Checkout</button>
        </div>
      </section>
      <FooterComponent />
    </>
  );
}
