import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import { useLocation, Redirect } from "react-router-dom";

import CheckoutForm from "../components/CheckOutForm";

const Payment = ({ userToken }) => {
  const stripePromise = loadStripe(
    "pk_test_51Ipu2SL4M9OGM8uNQRastp6n0v26oqb1SnwPpKeEXdljqaNTaZQmDyfFQXlwbFharWSquu6M6Q0UocAGuF1XaV2d00uvxXoIF8"
  );

  const location = useLocation();
  console.log(location);
  const { price, productName, offerId, userName } = location.state;

  return (
    <div>
      {!userToken ? (
        <Redirect to="/login" />
      ) : (
        <div className="payment-wrapper">
          <div className="payment-container">
            <div className="payment-card summary">
              <div className="title">Résumé de la commande</div>
              <div className="content">
                <ul>
                  <li>Commande</li> <span>{price}</span>
                  <li>Frais protection acheteurs 0.60 €</li>
                  <li>Frais de port 1,20 €</li>
                </ul>
              </div>
              <div className="divider"></div>
              <div className="content">
                <ul>
                  <li class="bold">
                    Total
                    <span>{price + 1.8}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="payment-card">
              <div className="content">
                Il ne vous reste plus qu'une étape pour vous offrir
                <span className="bold"> {productName} </span>
                Vous allez payer {price + 1.8} € (frais de protection et frais
                de port inclus).
                <div className="divider"></div>
                {/* <span>{title}</span> */}
                <Elements stripe={stripePromise}>
                  {/* Tout ce qui est contenu dans Elements a accès à l'API Stripe */}
                  <CheckoutForm
                    offerId={offerId}
                    userName={userName}
                    userToken={userToken}
                    price={price + 1.8}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
