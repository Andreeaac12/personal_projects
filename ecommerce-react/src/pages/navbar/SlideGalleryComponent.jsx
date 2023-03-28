import { Link } from "react-router-dom";
import "./SlideGalleryComponent.css";

export function SlideGalleryComponent(props) {
  const { Title, Price, Currency, Description, Poster, id } = props;

  return (
    <Link to={`/product-details/${id}`}>
      <div className="parent-container">
        <article className="product-card">
          <img src={Poster} alt="Product Poster" />
        </article>

        <div className="container-hover">
          <article className="products-card--title">
            <span>
              <h3>{Title}</h3>
            </span>
           
            <span className="price">
              {Price}
              {Currency}
            </span>
            <span className="stars">⭐⭐⭐⭐⭐</span>

          </article>
          <span className="product-card--description">
            <span>{Description}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
