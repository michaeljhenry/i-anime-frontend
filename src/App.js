import React, { Suspense, useCallback, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/styles.scss";
// import AddToWatchPage from './pages/AddToWatchPage';
import AuthContext from "./context/auth-context";
import NewDashboardPage from "./pages/NewDashboard";
import LoadingSpinner from "./components/Loader";
// import EditAnimePage from './pages/EditAnimePage';
// import UserAnimes from './pages/UserAnimes';
// import UserPage from './pages/UserPage';
// import Auth from './pages/Auth';
import NameContext from "./context/name-context";
import NewNav from "./components/NewNav";

let logoutTimer;

const NewAddAnimePage = React.lazy(() => import("./pages/NewAddAnimePage"));
const NewUserPage = React.lazy(() => import("./pages/NewUserPage"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const AnimeDetailsPage = React.lazy(() => import("./pages/AnimeDetailsPage"));
const AnimeDashboardPage = React.lazy(() =>
  import("./pages/AnimeDashboardPage")
);
const UsersDashboardPage = React.lazy(() =>
  import("./pages/UsersDashboardPage")
);

const App = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");

  const setNameFunction = useCallback((searchedName) => {
    setName(searchedName);
  }, []);
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); // current date + one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(
    () => {
      if (token && tokenExpirationDate) {
        const remainingTime =
          tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    },
    [token, logout, tokenExpirationDate],
    tokenExpirationDate
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/">
          <NewDashboardPage />
        </Route>
        <Route component={AnimeDashboardPage} exact path="/animedash"></Route>
        <Route component={UsersDashboardPage} exact path="/usersdash"></Route>
        <Route component={Login} exact path="/login"></Route>
        <Route component={Register} exact path="/register"></Route>
        <Route component={NewAddAnimePage} path="/add"></Route>
        <Route
          component={AnimeDetailsPage}
          exact
          path="/animedetails/:id"
        ></Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <NewDashboardPage />
        </Route>
        <Route component={AnimeDashboardPage} exact path="/animedash"></Route>
        <Route component={UsersDashboardPage} exact path="/usersdash"></Route>
        <Route component={Login} exact path="/login"></Route>
        <Route component={Register} exact path="/register"></Route>
        <Route
          component={AnimeDetailsPage}
          exact
          path="/animedetails/:id"
        ></Route>
        <Route exact path="/:id/animes">
          <NewUserPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <NameContext.Provider
        value={{
          name: name,
          setNameFunction: setNameFunction,
        }}
      >
        <Router>
          <NewNav />

          <Suspense
            fallback={
              <div>
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </Router>
      </NameContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
