import React from "react";
import { Container, Button, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NewDashboard = () => {
  return (
    <>
      <Container className="dashboard-container" fluid>
        <Row className="dashboard-btn__row">
          <LinkContainer to="/usersdash">
            <Button className="dashboard-button" id="dashboard-users">
              SEE USERS
            </Button>
          </LinkContainer>

          <Image id="logo" src="/images/I-A - Copy (2).png" alt="logo" />
          <LinkContainer to="/animedash">
            <Button className="dashboard-button" id="dashboard-anime">
              SEE ANIME
            </Button>
          </LinkContainer>
        </Row>
      </Container>
    </>
  );
};

export default NewDashboard;
