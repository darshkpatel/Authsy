import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
const Login = lazy(() => import("./views/Login"));
const Landing = lazy(() => import("./views/Landing"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Signup = lazy(() => import("./views/Signup"));
const MobileDashboard = lazy(() => import("./views/mobile/Dashboard"));
const AuthSucess = lazy(() => import("./views/AuthSucess"));

const App = () => (
  <Router>
    <BrowserView>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dash" component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/auth/success" component={AuthSucess} />
        <Route path="/" component={Landing} />
      </Switch>
    </Suspense>
    </BrowserView>

    <MobileView>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/mobile" component={MobileDashboard} />
        <Redirect from="/" to="/mobile"/>     
      </Switch>
    </Suspense>
    </MobileView>

  </Router>
);

export default App;
