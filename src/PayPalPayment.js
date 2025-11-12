import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalPayment = () => {
  return (
    <PayPalScriptProvider options={{ "client-id": "AUOQy8emyzs7fLV3Y9VPkvJGOwBD3I-FTrGUtKLaTRBQrH5_7ouDBRtELAalHH6ba5pZJje1Ct3Pgjwk" }}>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // amount in USD
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert("Transaction completed by " + details.payer.name.given_name);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalPayment;
