import { useParams } from "react-router-dom";
import Header from "../components/Header";
// import axios
import axios from "axios";
// import hook react
import { useState, useEffect } from "react";

const Offer = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <Header />
      <div className="offer-container">
        <div className="offer-pictures">
          <img
            src={data.product_pictures[0].url}
            alt={data.product_name}
            className="offer-picture"
          />
        </div>
        <div className="offer-infos">
          <div>
            <span className="offer-price">{data.product_price} €</span>
            <ul>
              {data.product_details.length > 0 &&
                data.product_details.map((details, index) => {
                  return (
                    <li key={index}>
                      <span>{Object.keys(details)}</span>
                      <span>{Object.values(details)}</span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="separator"></div>
          <div className="offer-content">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
            <div className="offer-avatar-username">
              <img
                src={data.owner.account.avatar.secure_url}
                alt={data.product_name}
              />
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button>Acheter</button>
        </div>
      </div>
    </>
  );
};

export default Offer;
