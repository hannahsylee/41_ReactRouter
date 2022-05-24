import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Dogs from "./Dogs";
import FilterDogDetails from "./FilterDogDetails";
import Dog from "./Dog";

function Routes({dogs}) {
  return (
    <Switch>
        <Route exact path="/dogs"><Dogs dogs={dogs}/></Route>
        <Route exact path="/dogs/:name"><FilterDogDetails dogs={dogs}/></Route>
        <Redirect to="/dogs" />
    </Switch>
  );
}

export default Routes;