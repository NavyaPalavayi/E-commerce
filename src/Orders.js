import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

const Orders = ({ orders, addToOrders, decreaseQuantity, removeItem }) => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const subtotal = orders.reduce(
    (sum, item) => sum + (Number(item.price) || 0) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 100 : 0;
  const total = subtotal + shipping;

  const handleApprove = (order) => {
    setPaymentDetails(order);
    setPaymentSuccess(true);
  };

  // ✅ Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ SUCCESS SCREEN
  if (paymentSuccess) {
    return (
      <div className="container text-center mt-5">
        <div className="card shadow-lg p-5 mx-auto rounded-4" style={{ maxWidth: "600px" }}>
          <div className="display-3 text-success mb-3">✅</div>
          <h2 className="fw-bold mb-3">Payment Successful!</h2>
          <p className="text-muted mb-4">
            Thank you for your purchase. Your payment was processed successfully.
          </p>
          <hr />
          <h5 className="mt-3">Transaction Details</h5>
          <p className="mb-1">Order ID: <strong>{paymentDetails.id}</strong></p>
          <p className="mb-1">Total Paid: <strong>₹{total.toLocaleString()}</strong></p>
          <p className="mb-4">Status: <span className="text-success">Completed</span></p>

          <button className="btn btn-primary px-4 rounded-pill" onClick={() => navigate("/")}>
            🏠 Back to Home
          </button>
        </div>
      </div>
    );
  }

  // ✅ MAIN LAYOUT
  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-5">🛒 Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted fs-5">
            No orders yet. Add products to see them here!
          </p>
        </div>
      ) : (
        <div className="row g-4">
          {/* LEFT — Product List */}
          <div className="col-lg-8">
            <div className="row g-4">
              {orders.map((order) => (
                <div className="col-12 col-sm-6 col-md-4" key={order.id}>
                  <div
                    className="card h-100 border-0 shadow-sm rounded-4 text-center p-3"
                    style={{ transition: "all 0.3s ease" }}
                  >
                    <img
                      src={order.image}
                      alt={order.name}
                      className="card-img-top mx-auto mb-2"
                      style={{
                        height: "120px",
                        objectFit: "contain",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                      }}
                    />
                    <div className="card-body p-2">
                      <h6 className="fw-bold mb-1">{order.name}</h6>
                      <p className="text-muted small mb-3">
                        ₹{Number(order.price).toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="d-flex justify-content-center align-items-center mb-3">
                        <button
                          className="btn btn-outline-secondary btn-sm rounded-circle me-2"
                          onClick={() => decreaseQuantity(order.id)}
                        >
                          −
                        </button>
                        <span className="fw-semibold">{order.quantity}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm rounded-circle ms-2"
                          onClick={() => addToOrders(order)}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="btn btn-outline-danger btn-sm w-100 rounded-pill"
                        onClick={() => removeItem(order.id)}
                      >
                        <FaTrashAlt className="me-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Order Summary */}
          {!isMobile && (
            <div className="col-m-4">
              <div
                className="card shadow-sm p-4 rounded-4 sticky-top text-dark"
                style={{
                  top: "90px",
                  background: "linear-gradient(135deg, #f0f7ff, #e5e9ff)",
                  border: "none",
                }}
              >
                <h5 className="fw-bold mb-3">🧾 Order Summary</h5>

                {/* ✅ Product Names and Prices */}
                <div className="mb-3">
                  {orders.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between small mb-2 border-bottom pb-1"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5 mb-4">
                  <span>Total</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>

                {/* Payment Section */}
                <h6 className="fw-bold mb-3 text-center text-secondary">
                  💳 Payment Options
                </h6>

                <div className="text-center  ">
                   
                  <PayPalScriptProvider
                    options={{
                      "client-id": "AUOQy8emyzs7fLV3Y9VPkvJGOwBD3I-FTrGUtKLaTRBQrH5_7ouDBRtELAalHH6ba5pZJje1Ct3Pgjwk",
                      currency: "USD",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical", color: "gold", shape: "pill" }}
                      onApprove={async (data, actions) => {
                        const order = await actions.order.capture();
                        handleApprove(order);
                      }}
                      onError={(err) => {
                        console.error("PayPal error:", err);
                        alert("❌ Payment failed. Please try again.");
                      }}
                    />
                  </PayPalScriptProvider>

                  
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ✅ Floating Mobile Checkout Bar */}
      {isMobile && orders.length > 0 && (
        <div
          className="fixed-bottom bg-dark text-white d-flex justify-content-between align-items-center px-4 py-3 shadow-lg"
          style={{
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px",
            zIndex: 1050,
          }}
        >
          <div>
            <div className="fw-semibold">Total: ₹{total.toLocaleString()}</div>
            <small className="text-light-50">Incl. shipping</small>
          </div>
          <button
            className="btn btn-warning fw-bold rounded-pill px-4"
            data-bs-toggle="modal"
            data-bs-target="#paymentModal"
          >
            Proceed to Payment →
          </button>
        </div>
      )}
    </div>
  );
};

export default Orders;
