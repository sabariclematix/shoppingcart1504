import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
