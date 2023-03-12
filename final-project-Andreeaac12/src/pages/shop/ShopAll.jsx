import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import { FooterComponent } from "../footer/Footer";
import { MenuComponent } from "../menu/Menu";
import { AllProducts } from "./AllProducts";
import "./ShopAll.css";
import shopImage from "../../images/shopall.jpg";

export function ShopAll(props) {
  const { auth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const productsUrl = "http://localhost:3001/products";
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialProducts, setInitialProducts] = useState([]);
  const [filters, setFilters] = useState({
    hair: false,
    body: false,
  });

  useEffect(() => {
    fetch(productsUrl, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          setErrorMessage("There has been a problem, please try again later.");
        } else {
          setErrorMessage(null);
          return response;
        }
      })
      .then((response) => response.json())
      .then((productsFromServer) => {
        setProducts(productsFromServer);
        setInitialProducts(productsFromServer);
      });
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      const filteredProducts = initialProducts
        .filter((product) => product.Title.toLowerCase().includes(searchTerm))
        .filter((product) => {
          if (filters.hair && filters.body) {
            return product.Type === "hair" || product.Type === "body";
          } else if (filters.hair) {
            return product.Type === "hair";
          } else if (filters.body) {
            return product.Type === "body";
          } else {
            return true;
          }
        });
      setProducts(filteredProducts);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchTerm, initialProducts, filters]);

  function searchInputHandler(event) {
    setSearchTerm(event.target.value.toLowerCase());
  }

  function filterChangedHair(event) {
    setFilters({
      ...filters,
      hair: event.target.checked,
    });
  }

  function filterChangedBody(event) {
    setFilters({
      ...filters,
      body: event.target.checked,
    });
  }
  return (
    <>
      <MenuComponent />

      <section className="wrapping-bg-img">
        <div className="shop-image--container">
          <div>
            <img src={shopImage} alt="Shop Poster" className="img-big" />
          </div>
          <div>
            <p className="shop-text">Shop All</p>
          </div>
        </div>
      </section>
      {errorMessage}

      {!errorMessage && (
        <section>
          <div className="searching-items--container">
            <div className="search-wrap">
              <input
                id="search"
                type="text"
                className="search--input"
                onChange={searchInputHandler} 
                placeholder="Search for a product..."
              />
              <button type="submit" className="submit--search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            </div>
            <div className="filters-container">
                <label>Filter by Category</label>
              <div>
                <label htmlFor="hair">Hair</label>
                <input id="hair" type="checkbox" onChange={filterChangedHair}  />
              </div>
              <div>
                <label htmlFor="body">Body</label>
                <input id="body" type="checkbox" onChange={filterChangedBody} />
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="wrapping-products">
        {Array.from(products).map((product) => {
          return (
            <AllProducts
              Title={product.Title}
              Price={product.Price}
              Currency={product.Currency}
              Description={product.Description}
              Poster={product.Poster}
              id={product.id}
              key={product.id}
            ></AllProducts>
          );
        })}
      </div>
      <FooterComponent />
    </>
  );
}
