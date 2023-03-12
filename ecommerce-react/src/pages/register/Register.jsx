import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { MenuComponent } from "../menu/Menu";
import { NavbarComponent } from "../navbar/NavbarComponent";
import "./Register.css";

export function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirstName] = useState("");
  const [last, setLastName] = useState("");
  const [address, setUserAddress] = useState("");

  const navigate = useNavigate();

  const url = "http://localhost:3001/register";

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { auth, setAuth } = useContext(AuthContext);

  function onSubmit(e) {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!emailValid) {
      setEmailError("Please enter a valid email");
    }
    if (!emailValid || !passwordValid) {
      return;
    }
    const body = {
      email,
      password,
      first,
      last,
      address,
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.accessToken}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((response) => {
        setAuth(response);
        navigate("/");
      });
  }
  function validateEmail(email) {
    const emailRegex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    const emailValid = emailRegex.test(email);
    if (!emailValid) {
      setEmailError("Please enter a valid email");
    }

    return emailValid;
  }

  function validatePassword(password) {
    const specialCharacterList = ["!", "@", "#", "$", "%", "*"];
    if (!(password.length >= 6)) {
      setPasswordError("Password must contain at least 6 characters");
      return false;
    }
    let hasUpperCaseCharacter = false;
    let hasNumberCharacter = false;
    let hasSpecialCharacter = false;

    for (let letter of password) {
      if (
        !specialCharacterList.includes(letter) &&
        Number.isNaN(Number(letter)) &&
        letter === letter.toUpperCase()
      ) {
        hasUpperCaseCharacter = true;
      }
      if (typeof Number(letter) === "number") {
        hasNumberCharacter = true;
      }
      if (specialCharacterList.includes(letter)) {
        hasSpecialCharacter = true;
      }
    }
    if (!hasUpperCaseCharacter) {
      setPasswordError(
        "Your password must have at least one uppercase character"
      );
    }
    if (!hasNumberCharacter) {
      setPasswordError("Your password must include at least one number");
    }
    if (!hasSpecialCharacter) {
      setPasswordError(
        "Your password must include at least one special character"
      );
    }
    if (hasUpperCaseCharacter && hasNumberCharacter && hasSpecialCharacter) {
      return true;
    }
    return false;
  }
  return (
    <>
      <MenuComponent />
      <div className="register-container">
        <div className="register-form">
          <form onSubmit={onSubmit}>
            <div>
              <label htmlFor="firstname">First name</label>
              <input
                value={first}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstname"
                id="firstname"
                required
              />
            </div>
            <div>
              <label htmlFor="last">Last name</label>
              <input
                value={last}
                onChange={(e) => setLastName(e.target.value)}
                name="last"
                id="last"
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                value={address}
                onChange={(e) => setUserAddress(e.target.value)}
                name="address"
                id="address"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                typename="email"
                id="email"
                required
              />
            </div>
            <p>{emailError}</p>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
              required
            />
            <p>{passwordError}</p>
            <button className="register-btn buttons-register" type="submit">
              Register
            </button>
          </form>
          <button
            className="buttons-register login-reg"
            onClick={() => navigate("../login")}
            type="button"
          >
            Already have an account? Login here
          </button>
        </div>
      </div>
    </>
  );
}
