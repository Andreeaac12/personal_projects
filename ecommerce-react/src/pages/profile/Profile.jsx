import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FooterComponent } from "../footer/Footer";
import { MenuComponent } from "../menu/Menu";
import { AuthContext } from "../../App";
import "./Profile.css";

export function Profile() {
  let { userId } = useParams();
  const userDetails = "http://localhost:3001/users";
  const [userData, setUserData] = useState([]);
  const { auth } = useContext(AuthContext);
  const [address, setAddress] = useState("");

  useEffect(() => {
    fetch(`${userDetails}/${auth.user.id}`, {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUserData(result);
        setAddress(result.address);
      });
  }, []);

  function selectAddress(event) {
    setAddress(event.target.value);
  }

  const body = {
    address: address,
  };
  function submit(event) {
    event.preventDefault();
    fetch(`${userDetails}/${auth.user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(body),
    });
  }
  return (
    <>
      <MenuComponent />
      <div className="wrapping-personal--information">
        <div className="personal-info">
          <h3 className="title-personal">Datele mele personale</h3>
          <ul className="ul-address">
            <p className="info-edit">Full Name:</p>
            <p>
              {auth?.user?.first} {auth?.user?.last}
            </p>
            <p className="info-edit">Email:</p>
            <p>{auth?.user?.email}</p>
            <span>
              <p  className="info-edit">Address:</p>
            <input type="text" value={address} disabled className="disabled-address"/>

            </span>
          </ul>
        </div>
        <div className="personal-info">
          <h3 className="title-personal">Adresele mele de livrare</h3>
          <form className="form-address">
            <label htmlFor="address" className="info-edit-address">
              Address
            </label>

            <input
              className="input-filed"
              type="text"
              id="address"
              value={address}
              onChange={selectAddress}
            />

            <button onClick={submit} className="btn-change--address">
              Change Address
            </button>
          </form>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
