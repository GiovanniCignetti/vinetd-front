import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useHistory } from "react-router-dom";

const CheckOutForm = ({ userToken, userName, offerId, price }) => {
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Lecture données carte saisis
    const cardElement = elements.getElement(CardElement);

    // Apel API Stripe pour avoir token
    const stripeResponse = await stripe.createToken(cardElement, {
      name: userName,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    // Une fois le token reçu depuis l'API Stripe
    // Requête vers backend avec token reçu par API STRIPE
    const response = await axios.post(
      "https://vinted-giovanni.herokuapp.com/payment",
      // "http://localhost:3001/payment",
      {
        stripeToken,
        offerId,
        userName,
        price,
      },
      {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      }
    );
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      setCompleted(true);
      history.push("/");
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Payer</button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckOutForm;
