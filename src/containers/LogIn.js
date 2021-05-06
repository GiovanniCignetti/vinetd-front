import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const LogIn = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  //   const token = null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    // vérification si LogIn OK
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
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
      <div className="login-form">
        <h2>Se connecter</h2>
        <form action="" onSubmit={handleSubmit}>
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
            <button type="submit">Se connecter</button>
          </div>
          <div>{!isLoading && <span>{data.token ? 1 : 2}</span>}</div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
