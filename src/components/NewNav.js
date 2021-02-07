import React from "react";
import { Nav, Navbar, Image } from "react-bootstrap";

const NewNav = () => {
  return (
    <Navbar variant="dark" expand="lg">
      <Navbar.Brand href="#home">
        <Image id="nav-logo" src="/images/I-Anime-2.PNG" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Add</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NewNav;
