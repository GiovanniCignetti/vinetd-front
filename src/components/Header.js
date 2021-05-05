import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <Link to={`/`}>
        <div>
          <img className="logo" src={logo} alt="logo" />
        </div>
      </Link>
      <div>
        <input></input>
      </div>
      <div>
        <button></button>
        <button></button>
      </div>
      <div>
        <button></button>
      </div>
    </div>
  );
};

export default Header;
