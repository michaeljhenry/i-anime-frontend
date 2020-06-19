import React, {useCallback, useState} from 'react';
import {
  BrowserRouter as Router,
  Route, 
  NavLink,
  Switch
} from "react-router-dom";
import AddWatchedPage from './pages/AddWatchedPage';
import AddToWatchPage from './pages/AddToWatchPage';
import AuthContext from './context/auth-context';
import DashboardPage from './pages/DashboardPage';
import UserAnimes from './pages/UserAnimes';
import UserPage from './pages/UserPage';
import Auth from './pages/Auth';
const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let routes;
  if(isLoggedIn) {
    routes = (
      <Router>
      <nav>
      <NavLink exact = {true} to='/'>Home</NavLink>
      <NavLink to='/anime/add/watched'>Add Watched Anime</NavLink>
      <NavLink to='/anime/add/toWatch'>Add To-Watch Anime</NavLink>
      <NavLink to='/u1/animes'>My Anime</NavLink>
    </nav>
        <Switch> 
            <Route exact path = '/'><DashboardPage/></Route>
            <Route path='/anime/add/watched'><AddWatchedPage/></Route>
            <Route path='/anime/add/toWatch'><AddToWatchPage/></Route>
            <Route exact path='/:id/animes'><UserPage/></Route>
            <Route path='/:id/animes/watched'><UserAnimes/></Route>
            <Route path='/:id/animes/toWatch'><UserAnimes/></Route>
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
  </Switch>
  </Router>
  }
  
  return(
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout
      }}
    >
    {isLoggedIn ? <button onClick = {logout}>Logout</button> : ''}

      {routes}
  </AuthContext.Provider>
   
  )
  
}

export default App;
