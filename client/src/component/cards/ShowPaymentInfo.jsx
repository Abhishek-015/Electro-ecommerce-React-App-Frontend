import React from "react";


const ShowPaymentInfo = ({ order }) => (
  <div>
    {/* {JSON.stringify(order,null,4)} */}
    <p>
      <span>Order Id: {order.paymentIntent.paymentIntent.id},</span>{" "}
      <span>
        Amount:{" "}
        {(order.paymentIntent.paymentIntent.amount /= 100).toLocaleString()},
      </span>{" "}
      <span>
        Currency: {order.paymentIntent.paymentIntent.currency.toUpperCase()},
      </span>{" "}
      <span>
        Method: {order.paymentIntent.paymentIntent.payment_method_types[0]},
      </span>{" "}
      <span>
        Payment: {order.paymentIntent.paymentIntent.status.toUpperCase()},
      </span>{" "}
      <span>
        Ordered on :{" "}
        {new Date(
          order.paymentIntent.paymentIntent.created * 1000
        ).toLocaleString()}
        ,
      </span>{" "}
      <span className="badge bg-primary text-white">
        STATUS : {order.orderStatus}
      </span>{" "}
    </p>
  </div>
);

export default ShowPaymentInfo;
