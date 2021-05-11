import { Link } from "react-router-dom";
import imgTop from "../assets/img/imgTop.jpg";
// import axios
import axios from "axios";
// import hook react
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-giovanni.herokuapp.com/offers"
          // "http://localhost:3001/offers"
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

  return isLoading ? (
    <span>En cours de chargement... </span>
  ) : (
    <>
      <div
        className="home-img-top"
        style={{
          backgroundImage: `url(${imgTop})`,
        }}
      >
        <div>
          <div className="home-top-div">
            Prêts à faire du tri dans vos placards ?
            <Link to="/publish">
              <button>Commencer à vendre</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="home-content">
        {/* {console.log(data.offers.length)} */}
        {data.offers.length > 0 &&
          data.offers.map((item, index) => {
            // console.log(item._id);
            return (
              <Link to={`/offer/${item._id}`} key={item._id}>
                <div className="item" key={item._id}>
                  {/* Photo User et Pseudo  */}
                  <div className="item-avatar-username">
                    {item.owner &&
                      item.owner.account &&
                      item.owner.account.avatar &&
                      item.owner.account.avatar.secure_url && (
                        <img
                          src={item.owner.account.avatar.secure_url}
                          alt={
                            item.owner &&
                            item.owner.account &&
                            item.owner.account.username
                          }
                        />
                      )}
                    {item.owner && item.owner.account && (
                      <span>{item.owner.account.username}</span>
                    )}
                  </div>
                  <div>
                    {/* Photo Vetement */}
                    {item.product_image && (
                      <img
                        src={item.product_image.secure_url}
                        alt={item.product_name}
                      />
                    )}

                    <div className="item_details">
                      <span>{item.product_price} €</span>
                      {item.product_details.length > 0 &&
                        item.product_details.map((details) => {
                          return <span>{details.TAILLE}</span>;
                        })}
                      {item.product_details.length > 0 &&
                        item.product_details.map((details) => {
                          return <span>{details.MARQUE}</span>;
                        })}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
};

export default Home;
