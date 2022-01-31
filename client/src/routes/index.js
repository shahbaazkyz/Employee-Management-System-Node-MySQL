import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route
        path={`/designations`}
        component={asyncComponent(() => import("./Designations"))}
      />
      <Route
        path={`/employees`}
        component={asyncComponent(() => import("./Employees"))}
      />
    </Switch>
  </div>
);

export default App;
