import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userTOken") || null);

  const setUser = (tokenOrNull) => {
    console.log(2, tokenOrNull);
    // la fonction reçoit le token ou une valeur nulle
    if (tokenOrNull) {
      Cookies.set("userToken", tokenOrNull, { expires: 1 });
    } else {
      Cookies.remove("userToken");
    }
    // maj du state avec la valeur reçue
    setUserToken(tokenOrNull);
  };

  return (
    <Router>
      {/* passage du token et de la fonction pour 
      conditionner l'affichage des boutons */}
      <Header userToken={userToken} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/signup">
          <SignUp setUser={setUser} />
        </Route>
        <Route path="/login">
          <LogIn setUser={setUser} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
