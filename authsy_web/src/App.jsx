import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useMedia } from 'react-use';
const Login = lazy(() => import("./views/Login"));
const Landing = lazy(() => import("./views/Landing"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Signup = lazy(() => import("./views/Signup"));
const MobileDashboard = lazy(() => import("./views/mobile/Dashboard"));
const AuthSucess = lazy(() => import("./views/AuthSucess"));
const AddDevice = lazy(() => import("./views/AddDevice"));
// const Receive = lazy(() => import("./views/Receiver"));
const MobileLogin = lazy(() => import("./views/mobile/Login"));

const App = () => {
  const isDesktop = useMedia('(min-width: 900px)');
  if (isDesktop) {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/dash" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/addDevice" component={AddDevice} />
            <Route path="/auth/success" component={AuthSucess} />
            <Route path="/" component={Landing} />
            <Redirect from="/mobile" to="/" />
          </Switch>
        </Suspense>
      </Router>
    );
  }
  else {
    return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/mobile" component={MobileDashboard} />
            <Route path="/mlogin" component={MobileLogin} />
            <Redirect from="/" to="/mobile" />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App;
