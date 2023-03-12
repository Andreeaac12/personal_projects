import React, { useContext, useEffect, useRef, useState } from "react";
import menuImg from "../../images/menu-img.jpg";
import Modal from "./modal/Modal";
import { useNavigate } from "react-router-dom";
import "./Menu.css";
import { AuthContext } from "../../App";
import ShoppingCart from "../cart/ShoppingCart";




export function MenuComponent() {
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(true);
  let menuRef = useRef();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    let handler = (event) => {
      if (!event.target.closest(".modalAbout")) {
        setShowModal("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <nav className="navbar-menu">
        <img
          onClick={() => navigate("/")}
          src="https://www.lawnmowerlawnmower.com/se/brands/gisou.png"
          width="200px"
          alt="Brand Icon"
        />
        {showNav ? (
          <ul className="list-menu">
            <div className="dropdown">
              <a href="#shop" className="active drop-btn">
                Shop
              </a>

              <div className="shop-container">
                <div className="shop-card">
                  <img src={menuImg} className="menu-img" alt="Menu Poster" />
                  <div className="shop-card--components">
                    <h2>Gisou Advent Calendar</h2>
                    <p>5 days of surprises & treats</p>
                    <button className="shop-card--button">
                      See Today's Treat
                    </button>
                  </div>
                </div>
                <div>
                  <h2>Hair</h2>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/5`)}>
                      Hair Treatment
                    </a>
                  </li>
                  <li>
                    <a href="#">Shampoo & Conditioner</a>
                  </li>
                  <li>
                    <a href="#">Hair Styling</a>
                  </li>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/4`)}>
                      Hair Fragrance
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/8`)}>
                      Curling Tool
                    </a>
                  </li>

                  <li className="shop-all">
                    <a href="#" onClick={() => navigate("../shop")}>
                      Shop All
                    </a>
                  </li>
                </div>
                <div>
                  <h2>Face & Body</h2>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/rP568p9`)}>
                      Face Oil
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/1`)}>
                      Lip Oil
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={() => navigate(`/product-details/1`)}>
                      Beauty Balm
                    </a>
                  </li>
                  <li>
                    <a href="#">Body Oil</a>
                  </li>
                </div>

                <div className="shop-card">
                  <img src={menuImg} className="menu-img" alt="Menu Poster" />
                  <div className="shop-card--components">
                    <h2>Gisou Glam Look Party</h2>
                    <p>5 days of surprises & treats</p>
                    <button className="shop-card--button">
                      See Today's Treat
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <a href="#best">Best Sellers</a>
            <a href="#best">Gift Guide</a>
            <div ref={menuRef}>
              <a
                href="#about"
                className="modalAbout"
                onClick={() => setShowModal(true)}
              >
                ABOUT GISOU
              </a>
              <Modal open={showModal} onClose={() => setShowModal(false)} />
            </div>
          </ul>
        ) : null}
        <a href="#show" className="icon">
          <i
            className="fa-solid fa-bars"
            onClick={() => setShowNav(!showNav)}
          ></i>
        </a>

        <div className="icons-menu">
          {/* <form action="#" className="search">
            <input
              type="search"
              name="search"
              placeholder="Search for a product..."
            />
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form> */}
          <form onSubmit={handleSubmit}>
            <div className="dropdown-logout">
              <button onClick={() => navigate("../login")} className="dropbtn" type="button">
                <i className="fas fa-user"></i>
              </button>
              <div className="drop-content">
                {/* <Link to={`/profile/`}> */}
                <button
                  className="profile-user"
                  onClick={() => navigate("../profile")}
                  type="button"
                >
                  <i className="fa-solid fa-lock"></i>Profile
                </button>
                {/* </Link> */}
                {/* I have to verify if user is log in , if so,  register button must disappear.  */}
                <button
                  onClick={() => navigate("../register")}
                  className="btn-register"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  Register
                </button>
                <button
                  onClick={(e) => logOut(navigate("../login"))}
                  className="btn-logout"
                >
                  <i className="fa-solid fa-person-through-window"></i>
                  Logout
                </button>
              </div>
            </div>
          </form>
          
          <button
          onClick={() => navigate("../cart")}>
            <i className="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
      </nav>
    </>
  );
}
