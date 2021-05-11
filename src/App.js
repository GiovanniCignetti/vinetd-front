import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useState } from "react";
import Offer from "./containers/Offer";
import Home from "./containers/Home";
import Header from "./components/Header";
import SignUp from "./containers/SignUp";
import LogIn from "./containers/LogIn";
import Publish from "./containers/Publish";
import Payment from "./containers/Payment";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userName, setUserName] = useState(Cookies.get("userName") || null);

  const setUser = (tokenOrNull, userNameOrNull) => {
    // console.log(2, tokenOrNull);
    // la fonction reçoit le token ou une valeur nulle
    if (tokenOrNull) {
      Cookies.set("userToken", tokenOrNull, { expires: 1 });
    } else {
      Cookies.remove("userToken");
    }
    // maj du state avec la valeur reçue
    setUserToken(tokenOrNull);

    // la fonction reçoit le userName ou une valeur nulle
    if (userNameOrNull) {
      Cookies.set("userName", userNameOrNull, { expires: 1 });
    } else {
      Cookies.remove("userName");
    }
    // maj du state avec la valeur reçue
    setUserName(userNameOrNull);
  };

  return (
    <Router>
      {/* passage du token et de la fonction pour 
      conditionner l'affichage des boutons */}
      <Header userToken={userToken} userName={userName} setUser={setUser} />
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
        <Route path="/publish">
          <Publish userToken={userToken} />
        </Route>
        <Route path="/payment">
          <Payment userToken={userToken} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
