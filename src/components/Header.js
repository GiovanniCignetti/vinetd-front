import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
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
        <button className="btn1">S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <div>
        <button className="btn-sold">Vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
