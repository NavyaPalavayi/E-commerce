import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function Products({ onAddToCart }) {
  const products = [
    { id: 1, name: "Laptop", price: 60000, image: "/images/laptop.png" },
    { id: 2, name: "Smartphone", price: 25000, image: "/images/smartphone.png" },
    { id: 3, name: "Headphones", price: 3000, image: "/images/headphone.png" },
    { id: 4, name: "Smartwatch", price: 7000, image: "/images/smartwatch.png" },
    { id: 5, name: "Handbag", price: 6000, image: "/images/handbag.png" },
    { id: 6, name: "T-shirt", price: 2500, image: "/images/tshirt.png" },
    { id: 7, name: "Sneakers", price: 3500, image: "/images/sneakers.png" },
    { id: 8, name: "Watch", price: 7000, image: "/images/watch.png" },
    {
      id: 9,
      name: "Footwear",
      price: 900,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqsb0VoDKD6aMF9ylvnXKr34j5R_kRDXC4kw&s",
    },
    {
      id: 10,
      name: "Teddybear",
      price: 600,
      image:
        "https://media-wallmantra.com/product/other/wallmantra-bow-tie-soft-premium-blue-big-teddy-bear-available-in-multiple-sizes-2-ft-A8CB-large.webp",
    },
    {
      id: 11,
      name: "Camera",
      price: 5000,
      image:
        "https://png.pngtree.com/png-vector/20240905/ourmid/pngtree-black-dslr-camera-with-large-lens-clipart-illustration-stock-photo-png-image_13758787.png",
    },
    {
      id: 12,
      name: "Travelbag",
      price: 4000,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp4uZnuWq_vjSOhUmZDfk3p24F0YZ0ZeMfNw&s",
    },
    {
      id: 13,
      name: "Clock",
      price: 350,
      image: "https://cdn.dmart.in/images/products/MAY150006484xx20MAY24_5_B.jpg",
    },
    {
      id: 14,
      name: "Airpods",
      price: 2500,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRmJ1mWC60eLdQrZmxGUYNLFNIvltZCdkrEw&s",
    },
    {
      id: 15,
      name: "Sneakers",
      price: 3500,
      image: "/images/sneakers.png",
    },
    {
      id: 16,
      name: "Waterbottle",
      price: 150,
      image:
        "https://pexpo.in/cdn/shop/files/Extreme_E_1_9cc1603e-3e8d-4317-953b-e9378e829685.jpg?v=1758113535&width=1946",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");

  // Filter products based on search
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "priceLowHigh") return a.price - b.price;
      if (sortOption === "priceHighLow") return b.price - a.price;
      if (sortOption === "nameAZ") return a.name.localeCompare(b.name);
      if (sortOption === "nameZA") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-bold">🛍️ Products</h2>

      {/* Search & Filter Row */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="🔎 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="default">🔽 Sort / Filter</option>
            <option value="priceLowHigh">💰 Price: Low → High</option>
            <option value="priceHighLow">💸 Price: High → Low</option>
            <option value="nameAZ">🔤 Name: A → Z</option>
            <option value="nameZA">🔡 Name: Z → A</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div key={p.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "180px",
                    objectFit: "contain",
                    background: "#f8f9fa",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text text-muted">₹{p.price.toLocaleString()}</p>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => onAddToCart(p)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-danger mt-4">No products found</p>
        )}
      </div>
    </div>
  );
}

export default Products;

