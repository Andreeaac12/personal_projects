import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import "./ProductEdit.css";

export function ProductEditComponent({ formType = "edit" }) {
  const productDetailUrl = "http://localhost:3001/products";
  let { productId } = useParams();

  const navigate = useNavigate();

  const { auth } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [poster, setPoster] = useState("");
  const [unique, setUnique] = useState("");
  const [description, setDescription] = useState("");
  const [multitasker, setMultitasker] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    if (formType === "edit") {
      fetch(`${productDetailUrl}/${productId}`, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((product) => {
          setTitle(product.Title);
          setPrice(product.Price);
          setType(product.Type);
          setPoster(product.Poster);
          setUnique(product.Unique);
          setDescription(product.Description);
          setMultitasker(product.Multitasker);
          setCurrency(product.Currency);
        });
    }
  }, []);

  function titleChange(event) {
    setTitle(event.target.value);
  }
  function priceChange(event) {
    setPrice(event.target.value);
  }
  function typeChange(event) {
    setType(event.target.value);
  }
  function posterChange(event) {
    setPoster(event.target.value);
  }
  function uniqueChange(event) {
    setUnique(event.target.value);
  }
  function descriptionChange(event) {
    setDescription(event.target.value);
  }
  function multitaskerChange(event) {
    setMultitasker(event.target.value);
  }
  function currencyChange(event) {
    setCurrency(event.target.value);
  }

  function submit(event) {
    event.preventDefault();

    const body = {
      Title: title,
      Price: price,
      Type: type,
      Poster: poster,
      Description: description,
      Unique: unique,
      Multitasker: multitasker,
      Currency: currency,
    };
    const url =
      formType === "edit"
        ? `${productDetailUrl}/${productId}`
        : productDetailUrl;

    fetch(url, {
      method: formType === "edit" ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(body),
    }).then(() => {
      if (formType === "edit") {
        navigate("/product-details/" + productId);
      } else {
        navigate("/");
      }
    });
  }
  return (
    <section className="container-edit">
      <h3 className="edit-create">
        {formType === "edit" ? "Edit Product Details" : "Create Product"}
      </h3>
      <form className="form-edit--container">
        <div className="wrapping-edit">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={titleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={descriptionChange}
            />
          </div>
          <div>
            <label htmlFor="unique">Unique</label>
            <input
              id="unique"
              type="text"
              value={unique}
              onChange={uniqueChange}
            />
          </div>
          <div>
            <label htmlFor="multitasker">Multitasker</label>
            <input
              id="multitasker"
              type="text"
              value={multitasker}
              onChange={multitaskerChange}
            />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              value={price}
              onChange={priceChange}
            />
          </div>
          <div>
            <label htmlFor="currency">Currency</label>
            <input
              id="currency"
              type="text"
              value={currency}
              onChange={currencyChange}
            />
          </div>

          <div>
            <label htmlFor="poster">Poster</label>
            <input
              id="poster"
              type="text"
              value={poster}
              onChange={posterChange}
            />
          </div>

          <div>
            <label htmlFor="type">Movie type</label>
            <select id="type" value={type} onChange={typeChange}>
              <option value="null" disabled>
                Please select a value
              </option>
              <option value="hair">Hair</option>
              <option value="body">Body</option>
            </select>
          </div>

          <button onClick={submit} className="btn-save--changes">
            {formType === "edit" ? "Save changes" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
