import { useParams, useHistory } from "react-router-dom";
// import axios
import axios from "axios";
// import hook react
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

const Offer = () => {
  let history = useHistory();
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // `https://vinted-giovanni.herokuapp.com/offer/${id}`
          `http://localhost:3001/offer/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      history.push("/payment", {
        price: data.product_price,
        productName: data.product_name,
        offerId: data._id,
        userName: data.owner.account.username,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div className="offer-body">
        {" "}
        <div className="offer-container">
          <div className="offer-pictures">
            {data && data.product_image && (
              <img
                src={data.product_image.secure_url}
                alt={data.product_name}
                className="offer-picture"
              />
            )}
          </div>
          <div className="offer-infos">
            <div>
              <span className="offer-price">{data.product_price} €</span>
              <ul className="offer-list">
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
              <p className="name">{data.product_name}</p>
              <p className="description">{data.product_description}</p>
              <div className="offer-avatar-username">
                {data.owner &&
                  data.owner.account &&
                  data.owner.account.avatar && (
                    <img
                      src={data.owner.account.avatar.secure_url}
                      alt={data.product_name}
                    />
                  )}
                {data.owner && data.owner.account && (
                  <span>{data.owner.account.username}</span>
                )}
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <button type="submit" className="buy-btn">
                Acheter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Offer;
