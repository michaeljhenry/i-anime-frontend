
import React, {useCallback, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Switch,
  Redirect
} from "react-router-dom";
import './styles/styles.scss';
import AddWatchedPage from './pages/AddWatchedPage';
import AddToWatchPage from './pages/AddToWatchPage';
import AuthContext from './context/auth-context';
import DashboardPage from './pages/DashboardPage';
import EditAnimePage from './pages/EditAnimePage';
import UserAnimes from './pages/UserAnimes';
import UserPage from './pages/UserPage';
import Auth from './pages/Auth';
import NameContext from './context/name-context';
import MainNav from './components/MainNav';

let logoutTimer;

const App = () => {

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState('');

  const setNameFunction = useCallback((searchedName) => {
    setName(searchedName); 
  }, []);
  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date((new Date().getTime() + 1000 * 60 * 60)); // current date + one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({userId: uid, token: token, expiration: tokenExpirationDate.toISOString()}));
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if(token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate], tokenExpirationDate)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && (new Date(storedData.expiration) > new Date())) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;
  if(token) {
    routes = (
        <Switch> 
            <Route exact path = '/'><DashboardPage/></Route>
            <Route path='/anime/add/watched'><AddWatchedPage/></Route>
            <Route path='/anime/add/toWatch'><AddToWatchPage/></Route>
            <Route path='/anime/edit/:aid'><EditAnimePage/></Route>
            <Route path='/anime/add/toWatch'><AddToWatchPage/></Route>
            <Route exact path='/:id/animes'><UserPage/></Route>
            <Route path='/:id/animes/watched'><UserAnimes/></Route>
            <Route path='/:id/animes/toWatch'><UserAnimes/></Route>
            <Redirect to="/" />
      </Switch>
    )
  }
  else {
    routes =
    <Switch> 
      <Route exact path = '/'><DashboardPage/></Route>
      <Route path = '/auth'><Auth/></Route>
      <Route exact path='/:id/animes'><UserPage/></Route>
      <Route path='/:id/animes/watched'><UserAnimes/></Route>
      <Route path='/:id/animes/toWatch'><UserAnimes/></Route>
      <Redirect to="/" />

  </Switch>
  }
  
  return(
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <NameContext.Provider
        value = {{
          name: name,
          setNameFunction: setNameFunction 
        }}
      >
      <Router>
      <MainNav/>

        {routes}
      </Router>

      </NameContext.Provider>
  </AuthContext.Provider>
   
  )
  
}

export default App;
