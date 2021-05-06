import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const SignUp = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          password: password,
          username: userName,
        }
      );
      if (response.data.token) {
        setUser(response.data.token);
        history.push("/");
      } else {
        console.log("Token non reçu");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="body-log">
      <div className="signup-form">
        <h2>S'inscrire</h2>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => setUserName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => setPassword(event.target.value)}
          />
          <div>
            <input type="checkbox" name="" id="" />
            <span>S'incrire à notre newsletter</span>
          </div>
          <div>
            <button type="submit">S'inscrire</button>
          </div>
          <div>
            <span></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
