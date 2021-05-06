import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
const Header = ({ setUser, userToken }) => {
  return (
    <div className="header">
      <div className="div-logo">
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Recherche des articles"
        ></input>
      </div>
      <div className="btns-left">
        {userToken ? (
          <button onClick={() => setUser(null)}>Se déconnecter</button>
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
        <button className="btn-sold">Vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
