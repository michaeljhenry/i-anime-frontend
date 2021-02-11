import React, { useContext } from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import authContext from "../context/auth-context";

const NewNav = () => {
  const auth = useContext(authContext);
  const onLogoutHandler = () => {
    auth.logout();
  };
  return (
    <Navbar variant="dark" expand="sm" collapseOnSelect>
      <Navbar.Brand href="/">
        <Image id="nav-logo" src="/images/I-Anime-2.PNG" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <LinkContainer exact to="/">
            <Nav.Link eventKey="1" href="/">
              Home
            </Nav.Link>
          </LinkContainer>
          {auth.isLoggedIn && (
            <React.Fragment>
              <LinkContainer to="/add">
                <Nav.Link eventKey="2">Add</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/${auth.userId}/animes`}>
                <Nav.Link eventKey="3">My Profile</Nav.Link>
              </LinkContainer>
            </React.Fragment>
          )}
          <LinkContainer to="/usersdash">
            <Nav.Link eventKey="4">Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/animedash">
            <Nav.Link eventKey="5">Animes</Nav.Link>
          </LinkContainer>
          <div className="authoptions">
            {!auth.isLoggedIn && (
              <React.Fragment>
                <LinkContainer to="/login">
                  <Nav.Link eventKey="6">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link eventKey="7">Register</Nav.Link>
                </LinkContainer>
              </React.Fragment>
            )}
            {auth.isLoggedIn && (
              <Nav.Item id="logout">
                <button onClick={onLogoutHandler}>Logout</button>
              </Nav.Item>
            )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNav;
