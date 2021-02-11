import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewUserCard = (props) => {
  return (
    <Card className="userslistcard">
      <Card.Img
        className="userslistcard--image"
        variant="top"
        src={`${process.env.REACT_APP_IMAGE_URL}/${props.image}`}
        alt="profile"
      />
      <Card.Body className="userslistcard--body">
        <Card.Title className="userslistcard--body__header">
          {props.name}
        </Card.Title>
        <Card.Text className="userslistcard--body__text">
          Animes Listed: {props.animes.length}
        </Card.Text>
        <Link className="userslistcard--body__link" to={`/user/${props.id}`}>
          See Profile
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NewUserCard;
