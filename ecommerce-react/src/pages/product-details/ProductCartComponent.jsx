import { useEffect } from "react";
import { Link } from "react-router-dom";

export function ProductCartComponent(props) {
  const cartUrl = "http://localhost:3001/cart";
  const { Price, Currency, id } = props;

  function addToCart(event) {
    event.preventDefault();

    fetch(cartUrl)
      .then((response) => response.json())
      .then((cartList) => {
        const [cart] = cartList;

        if (cart) {
          const productInCart = cart.products.find(
            (product) => product.productId === id
          );

          if (productInCart) {
            productInCart.quantity = productInCart.quantity + 1;
          } else {
            cart.products.push({ productId: id, quantity: 1 });
          }
          updateCart(cart.id, cart.products);
        } else {
          createCart();
        }
      });
  }
  //   fetch(`${cartUrl}?id=${productId}`)
  //prima oara ne uitam in baza de date daca avem produsul adaugat in cart, daca avem produsul adaugat in cart, updatam produsul si ii crestem cantitatea cu 1, daca nu avem produsul, iidam post cream produsul si setam cantitatea 1
  function createCart() {
    fetch(`${cartUrl}`, {
      method: "POST",
      body: JSON.stringify({
        products: [{ productId: id, quantity: 1 }],
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  function updateCart(cartId, products) {
    fetch(`${cartUrl}/${cartId}`, {
      method: "PATCH",
      body: JSON.stringify({ products }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <Link to={`/product-details/${id}`}>
      <button className="btn-product--page" onClick={addToCart}>
        Add To Bag
        <span> {Price}</span>
        {Currency}
      </button>
    </Link>
  );
}
