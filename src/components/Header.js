import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
const Header = ({ setUser, userToken, userName }) => {
  return (
    <div className="header">
      <Link to="/">
        <div className="div-logo">
          <img className="logo" src={logo} alt="logo" />
        </div>
      </Link>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        ></input>
      </div>
      <div className="btns-left">
        {userToken ? (
          <>
            <span>{`Bonjour ${userName}`}</span>
            <Link to="/">
              <button onClick={() => setUser(null, null)}>
                Se déconnecter
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup">
              <button className="btn1">S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}
      </div>
      <div>
        <Link to="/publish">
          <button className="btn-sold">Vends tes articles</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
