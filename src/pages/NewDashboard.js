import React from "react";
import { Container, Col, Button, Image, Row } from "react-bootstrap";
import NewNav from "../components/NewNav";

const NewDashboard = () => {
  return (
    <>
      <NewNav />
      <Container className="dashboard-container" fluid>
        <Row className="dashboard-btn__row">
          <Button className="dashboard-button" id="dashboard-users">
            SEE USERS
          </Button>
          <Image id="logo" src="/images/I-A - Copy (2).png" alt="logo" />

          <Button className="dashboard-button" id="dashboard-anime">
            SEE ANIME
          </Button>
        </Row>
      </Container>
    </>
  );
};

export default NewDashboard;
