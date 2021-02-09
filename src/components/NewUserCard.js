import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewUserCard = (props) => {
  return (
    <Card className="userslistcard">
      <Card.Img
        className="userslistcard--image"
        variant="top"
        src="/images/shikamaru-background.png"
      />
      <Card.Body classname="userslistcard--body">
        <Card.Title className="userslistcard--body__header">
          {props.name}
        </Card.Title>
        <Card.Text className="userslistcard--body__text">
          Animes Listed: {props.animes.length + 1}
        </Card.Text>
        <Link className="userslistcard--body__link" to={`/${props.id}/animes`}>
          See Profile
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NewUserCard;
