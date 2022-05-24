import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import VendingMachine from "./VendingMachine";
import Soda from "./Soda";
import Chips from "./Chips";
import Cookies from "./Cookies";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/">
            <VendingMachine />
          </Route>
          <Route path="/soda">
            <Soda />
          </Route>
          <Route exact path="/chips">
            <Chips />
          </Route>
          <Route exact path="/cookies">
            <Cookies />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;