import "./NavbarComponent.css";
import image from "../../images/bg-img2.jpg";
import giftCard from "../../images/giftcard.jpg";
import puzzle5 from "../../images/puzzle5.jpg";
import giftImg from "../../images/giftimg.jpg";
import { useContext, useEffect, useState } from "react";
import { SlideGalleryComponent } from "./SlideGalleryComponent";
import { motion } from "framer-motion";
import { Carousel } from "./Carousel";
import { FooterComponent } from "../footer/Footer";
import { MenuComponent } from "../menu/Menu";
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { ProductCartComponent } from "../product-details/ProductCartComponent";
// import { DefaultPlayer as Video } from "react-html5video/dist";
// import "react-html5video/dist/styles.css";
// import MyVideo from "../../videos/bee.mov";

export function NavbarComponent(props) {
  const productsUrl = "http://localhost:3001/products";
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  //

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
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  ///

  return (
    <>
      <header>
        {/* {errorMessage} */}

        <MenuComponent />
        <hr></hr>
        <div>
          <img
            src={image}
            className="bg-image"
            alt="Header Poster"
            onClick={() => navigate(`/product-details/2`)}
          />
        </div>
      </header>

      <div className="title-card">
        <h3>’TIS THE SEASON TO GIFT SOMETHING SPECIAL</h3>
        <p>
          Find the perfect holiday gifts, from beauty gift sets to self-care
          bestsellers to exclusive limited edition Gisou Holiday Season Gifts.
        </p>
        <motion.div
          transition={{ layout: { duration: 0.5 } }}
          layout
          className="gift-card"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p>Find the perfect gift in here</p>
          {isOpen && (
            <motion.div>
              <button className="btn-gift">
                <img src={giftCard} alt="" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
      <div className="carousel-container">
        <Carousel>
          {/* <img src={carousel1} alt="Carousel Poster"/>
          <img src={carousel2} alt="Carousel Poster"/>
          <img src={carousel3} alt="Carousel Poster"/>
          <img src={carousel4} alt="Carousel Poster"/>
          <img src={carousel5} alt="Carousel Poster"/>
          <img src={carousel6} alt="Carousel Poster"/> */}

          {products.map((carousel) => {
            return (
              <SlideGalleryComponent
                Title={carousel.Title}
                Price={carousel.Price}
                Currency={carousel.Currency}
                Description={carousel.Description}
                Poster={carousel.Poster}
                id={carousel.id}
                key={carousel.id}
              ></SlideGalleryComponent>
            );
          })}
        </Carousel>
      </div>
          
      <section>
        <div className="gifts-container">
          <a href="">
            <div className="puzzle-img">
              <img src={puzzle5} alt="Carousel Poster" />
            </div>
          </a>
          <div className="gifts-description">
            <h3>Holiday Puzzle</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ex
              beatae facere nulla consectetur, nam porro fuga dolorem vero
              consequuntur!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ex
              beatae facere nulla consectetur, nam porro fuga dolorem vero
              consequuntur! Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Tempore, sit?
            </p>
          </div>
        </div>
      </section>
      <h3 className="best--sellers" id="best">
        Best Sellers
      </h3>
      <div className="container-card">
        {/* <button>&lt;</button> */}

        {products.map((product) => {
          return (
            <SlideGalleryComponent
              Title={product.Title}
              Price={product.Price}
              Currency={product.Currency}
              Description={product.Description}
              Poster={product.Poster}
              id={product.id}
              key={product.id}
            ></SlideGalleryComponent>
          );
        })}
      </div>
      {/* <div className="video-container">
        <div className="description-video__container">
          <h3>Our Story</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
            eligendi obcaecati facere quos deserunt praesentium possimus maiores
            vero amet, accusamus, numquam rem? Dolores consequatur consectetur
            quas nostrum iste repudiandae dolorum?
          </p>
        </div>
        <div className="video">
          <Video width="200px" height="100px">
            <source src={MyVideo} type="video/mp4" />
          </Video>
        </div>
      </div> */}

      <section>
        <div className="gifts-container">
          <div className="gifts-description">
            <h3>Holiday Puzzle</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ex
              beatae facere nulla consectetur, nam porro fuga dolorem vero
              consequuntur!
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae ex
              beatae facere nulla consectetur, nam porro fuga dolorem vero
              consequuntur! Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Tempore, sit?
            </p>
          </div>
          <a href="">
            <div className="puzzle-img">
              <img src={giftImg} alt="Carousel Poster" />
            </div>
          </a>
        </div>
      </section>

      <FooterComponent />
    </>
  );
}
