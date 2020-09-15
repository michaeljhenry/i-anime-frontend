import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import AuthContext from "../context/auth-context";
import NavLinks from "./NavLinks";
import SearchUsers from "./SearchUsers";

const MainNav = () => {
  const auth = useContext(AuthContext);
  let location = useLocation();
  const pathname = location.pathname;
  return (
    <React.Fragment>
      <nav className="nav-header">
        <NavLinks />
        {pathname === "/" && <SearchUsers />}

        <div className="search-logout">
          {auth.token ? (
            <div className="logout-btn__main" onClick={auth.logout}>
              Logout
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

export default MainNav;
