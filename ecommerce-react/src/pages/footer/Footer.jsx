import React from "react";
import "./Footer.css";

export function FooterComponent() {
  return (
    <>
      <footer className="footer-container">
        <div>
          <p className="text-wrap--social">Join the #GisouFamily</p>
          <input
            type="email"
            name="email"
            id=""
            placeholder="Enter email address"
          />
         
          <div className="social-media-wrap">
            <a href="http://www.facebook.com">
              <i className="fa-brands fa-facebook"></i>
            </a>
            <a href="http://www.instagram.com">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="http://www.twitter.com">
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a href="http://www.youtube.com">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
        <ul>
          <p className="text-footer">Support</p>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">Refund Policy</a>
          </li>
        </ul>
        <ul>
          <p className="text-footer">About Gisou</p>
          <li>
            <a href="">Story</a>
          </li>
          <li>
            <a href="">Blog</a>
          </li>
        </ul>

        <ul>
          <p className="text-footer">Legal</p>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Cookie Policy</a>
          </li>
          <li>
            <a href="">Terms and Conditions</a>
          </li>
          <li>
            <a href="">Terms and Services</a>
          </li>
        </ul>
        <div></div>
      </footer>
      <div className="copy-rights">
        <p>&copy; 2022 Gisou. All worldwide rights reserved.</p>
      </div>
    </>
  );
}
