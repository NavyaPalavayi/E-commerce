// Home.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const offers = [
  {
    title: "Kitchen appliances",
    subtitle: "Mixers, inductions & more",
    price: "From ₹299",
    img: "https://cdn.firstcry.com/education/2023/01/13101355/Names-Of-Household-Appliances-In-English.jpg", // shortened
  },
  {
    title: "Galaxy S24 Snapdragon",
    subtitle: "India’s Most Wanted Deal",
    price: "From ₹38,999* ₹74,999",
    img: "/images/smartphone.png",
  },
  {
    title: "The grand festive savings",
    subtitle: "boAt, OnePlus, realme",
    price: "Under ₹3,999",
    img: "/images/headphone.png",
  },
  {
    title: "Samsung Book4 i5",
    subtitle: "16 GB / 512 GB SSD",
    price: "Just ₹39,999",
    img: "/images/laptop.png",
  },
];

const categories = [
  {
    name: "Women",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTunBhzLP_P-tQbNEdOmy-K_3gfejXV2RC-V9V21Dvwx5WGmSFHdHXIaMO22x8QGaWI9YKaND2y-5nbDDgPCPTNNNg-X-82VRdIK9Jo8nwlFjJx32Aj94mpdg",
  },
  {
    name: "Men",
    img: "/images/tshirt.png",
  },
  {
    name: "Footwear",
    img: "/images/sneakers.png",
  },
  {
    name: "Home Decor",
    img: "https://cdn.dmart.in/images/products/MAY150006484xx20MAY24_5_B.jpg",
  },
  {
    name: "Accessories",
    img: "/images/smartwatch.png",
  },
];

function Home({ username }) {
  return (
    <div className="container-fluid p-3">
      <h4 className="text-end">Hello {username} 👋</h4>
      <h2 className="text-center mb-3">Welcome to Ecommerce 🛍️</h2>
      <p className="text-center text-muted mb-5">
        Shop your favorite products at unbeatable prices!
      </p>

      {/* Hero Banner */}
      <div
        className="w-100 mb-5 rounded"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/gradient-shopping-discount-horizontal-sale-banner_23-2150321996.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
        }}
      ></div>

      {/* Categories */}
      <div className="container mb-5">
        <h4 className="mb-3 fw-bold">Shop by Category</h4>
        <div className="row g-3 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2 text-center" key={index}>
              <div
                className="bg-light rounded-circle p-3 shadow-sm d-flex align-items-center justify-content-center mx-auto mb-2"
                style={{ width: "120px", height: "120px" }}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="img-fluid"
                  style={{ maxHeight: "80px", objectFit: "contain" }}
                />
              </div>
              <p className="fw-semibold text-dark">{cat.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offers Section */}
      <div className="container-fluid py-5 ">
        <h4 className="mb-3 fw-bold">Latest Offers</h4>
        <div className="row g-4" >
          {offers.map((offer, index) => (
            <div className="col-md-6 col-m-4" key={index}>
              <div className="card border-0 shadow-sm h-100">
                <div className="row g-0 align-items-center h-100">
                  <div className="col-7 p-3">
                    <h6 className="text-muted mb-1">{offer.subtitle}</h6>
                    <h5 className="fw-bold">{offer.title}</h5>
                    <p className="text-danger fw-semibold">{offer.price}</p>
                  </div>
                  <div className="col-5 text-center">
                    <img
                      src={offer.img}
                      alt={offer.title}
                      className="img-fluid p-2"
                      style={{ maxHeight: "150px", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

