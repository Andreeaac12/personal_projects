import { Link } from "react-router-dom";
import "./AllProducts.css";

export function AllProducts(props) {
    // const productsUrl = "http://localhost:3001/products";
    const { Title, Price, Description, Poster, id} = props;

    // const [products, setProducts] = useState([]);
    // const { auth } = useContext(AuthContext);

    // useEffect(() => {
    //     fetch(productsUrl, {
    //       headers: {
    //         Authorization: `Bearer ${auth.accessToken}`,
    //       },
    //     })
         
    //       .then((response) => response.json())
    //       .then((productsFromServer) => setProducts(productsFromServer));
    //   },[]);
    return (
        <Link to={`/product-details/${id}`}>
            
         <li>
        <article className="product-card--shop">
          <img src={Poster} alt="Product Poster" />
          
        </article>
        <div className="wrapping-details">
        <span className="products-card--title__shop">
            <h3>{Title}</h3>
            <span className="price-shop">{Price}€</span>
          </span>
          <span className="product-card--description__shop">
            <span>{Description}</span>
          </span>
          </div>
      </li>
        </Link>
    )
  }