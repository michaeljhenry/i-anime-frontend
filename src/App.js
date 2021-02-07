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
import DashboardPage from "./pages/DashboardPage";
import NewDashboardPage from "./pages/NewDashboard";
import LoadingSpinner from "./components/Loader";
// import EditAnimePage from './pages/EditAnimePage';
// import UserAnimes from './pages/UserAnimes';
// import UserPage from './pages/UserPage';
// import Auth from './pages/Auth';
import NameContext from "./context/name-context";
import MainNav from "./components/MainNav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewUserPage from "./pages/NewUserPage";

let logoutTimer;

const Auth = React.lazy(() => import("./pages/Auth")); // code splitting. don't upload this code until required
const AddAnimePage = React.lazy(() => import("./pages/AddAnimePage"));
const EditAnimePage = React.lazy(() => import("./pages/EditAnimePage"));
const UserAnimes = React.lazy(() => import("./pages/UserAnimes"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const AnimeDashboardPage = React.lazy(() =>
  import("./pages/AnimeDashboardPage")
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
          <DashboardPage />
        </Route>
        <Route component={AnimeDashboardPage} exact path="/animedash"></Route>

        <Route path="/anime/add">
          <AddAnimePage />
        </Route>
        <Route path="/anime/edit/:aid">
          <EditAnimePage />
        </Route>
        <Route exact path="/:id/animes">
          <NewUserPage />
        </Route>
        <Route path="/:id/animes/watched">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/toWatch">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/watching">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/dropped">
          <UserAnimes />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <DashboardPage />
        </Route>
        <Route component={AnimeDashboardPage} exact path="/animedash"></Route>
        <Route component={NewDashboardPage} exact path="/newdash"></Route>
        <Route component={Login} exact path="/login"></Route>
        <Route component={Register} exact path="/register"></Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Route exact path="/:id/animes">
          <UserPage />
        </Route>
        <Route path="/:id/animes/watched">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/toWatch">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/watched">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/watching">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/dropped">
          <UserAnimes />
        </Route>
        <Route path="/:id/animes/toWatch">
          <UserAnimes />
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
