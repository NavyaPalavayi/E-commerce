import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row gy-4">
          {/* --- Company Info --- */}
          <div className="col-md-3">
            <h4 className="fw-bold text-primary">ShopEase</h4>
            <p className="small text-secondary mt-3">
              Your one-stop shop for fashion, electronics, and lifestyle essentials.
              Quality products. Fast delivery. Trusted by thousands.
            </p>
          </div>

          {/* --- Quick Links --- */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-uppercase mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-decoration-none text-light">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-decoration-none text-light">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-uppercase mb-3">Contact</h5>
            <p className="mb-1 small text-secondary">📧 support@shopease.com</p>
            <p className="mb-1 small text-secondary">📞 +91 98765 43210</p>
            <p className="small text-secondary">📍 Vijayawada, India</p>
          </div>

          {/* --- Social Links --- */}
          <div className="col-md-3">
            <h5 className="fw-semibold text-uppercase mb-3">Follow Us</h5>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-light">
                <FaFacebook />
              </a>
              <a href="#" className="text-light">
                <FaInstagram />
              </a>
              <a href="#" className="text-light">
                <FaTwitter />
              </a>
              <a href="#" className="text-light">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* --- Bottom Line --- */}
        <div className="text-center border-top border-secondary pt-3 mt-4">
          <p className="small mb-0 text-secondary">
            © {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
