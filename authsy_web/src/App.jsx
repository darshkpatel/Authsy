import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useMedia } from 'react-use';
const Login = lazy(() => import("./views/Login"));
const Landing = lazy(() => import("./views/Landing"));
const Dashboard = lazy(() => import("./views/Dashboard"));
const Signup = lazy(() => import("./views/Signup"));
const MobileDashboard = lazy(() => import("./views/mobile/Dashboard"));
const AuthSucess = lazy(() => import("./views/AuthSucess"));
const FlowError = lazy(() => import("./views/mobile/FlowError"));
const AddDevice = lazy(() => import("./views/AddDevice"));
const TotpRecieve = lazy(() => import("./views/TotpRecieve"));
const AddServer = lazy(() => import("./views/AddServer"));
const ManageServer = lazy(() => import("./views/ManageServer"));

const App = () => {
  const isDesktop = useMedia('(min-width: 700px)');
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
            <Route path="/auth2FA" component={TotpRecieve} />
            <Route path="/addServer" component={AddServer} />
            <Route path="/manageServer/:ipId" component={ManageServer} />
            <Route path="/" component={Landing} exact/>
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
            <Route path="/flowError" component={FlowError} />
            <Route path="/auth/success" component={AuthSucess} />
            <Route path="/login" component={Login} />
            <Redirect from="/" to="/mobile" />
            <Redirect from="/dash" to="/mobile" />
          </Switch>
        </Suspense>
      </Router>
    )
  }
}

export default App;
