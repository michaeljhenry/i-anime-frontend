import React, {useCallback, useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route, 
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
import AddWatchedPage from './pages/AddWatchedPage';
import AddToWatchPage from './pages/AddToWatchPage';
import AuthContext from './context/auth-context';
import DashboardPage from './pages/DashboardPage';
import EditAnimePage from './pages/EditAnimePage';
import UserAnimes from './pages/UserAnimes';
import UserPage from './pages/UserPage';
import Auth from './pages/Auth';
import NavLinks from './components/NavLinks';

let logoutTimer;

const App = () => {

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(null);


  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date((new Date().getTime() + 1000 * 60 * 60)); // current date + one hour
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData', JSON.stringify({userId: userId, token: token, expiration: tokenExpirationDate.toISOString()}));
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
  }, [token, logout], tokenExpirationDate)

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if(storedData && storedData.token && (new Date(storedData.expiration) > new Date())) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);

  let routes;
  if(token) {
    routes = (
      <Router>
        <NavLinks/>
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
    </Router>
    )
  }
  else {
    routes =
    <Router>
      <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/auth'>Authenticate</NavLink>
      </nav>
    <Switch> 


      <Route exact path = '/'><DashboardPage/></Route>
      <Route path = '/auth'><Auth/></Route>
      <Route exact path='/:id/animes'><UserPage/></Route>
      <Route path='/:id/animes/watched'><UserAnimes/></Route>
      <Route path='/:id/animes/toWatch'><UserAnimes/></Route>
      <Redirect to="/" />

  </Switch>
  </Router>
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
    {token ? <button onClick = {logout}>Logout</button> : ''}

      {routes}
  </AuthContext.Provider>
   
  )
  
}

export default App;
