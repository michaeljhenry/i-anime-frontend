import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

const NewNav = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Brand href="/newdash">
        <Image id="nav-logo" src="/images/I-Anime-2.PNG" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <LinkContainer eventKey="1" to="/newdash">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer eventKey="2" to="/add">
            <Nav.Link>Add</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/usersdash">
            <Nav.Link eventKey="3">Users</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/animedash">
            <Nav.Link eventKey="4" href="/newdash">
              Animes
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNav;
