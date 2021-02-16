import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
const Login = lazy(() => import("./views/Login"));
const Landing = lazy(() => import("./views/Landing"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const MobileDashboard = lazy(() => import("./views/mobile/Dashboard"));
const App = () => (
  <Router>
    <BrowserView>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/dash">
          <Dashboard />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
        
      </Switch>
    </Suspense>
    </BrowserView>
    <MobileView>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/mobile">
          <MobileDashboard />
        </Route>
        <Redirect from="/" to="/mobile"/>     
      </Switch>
    </Suspense>
    </MobileView>
  </Router>
);

export default App;
