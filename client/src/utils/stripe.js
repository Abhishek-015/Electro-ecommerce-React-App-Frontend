import axios from "axios";

export const createPaymentIntent = (authToken) =>
  axios.post(
    `${process.env.REACT_APP_API}/create-payment-intent`,
    {},
    {
      headers: {
        authToken,
      },
    }
  );
