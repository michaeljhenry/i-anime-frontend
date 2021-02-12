import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewUserCard = (props) => {
  return (
    <Card className="userslistcard">
      <Card.Img
        className="userslistcard--image"
        variant="top"
        src={`/images/shikamaru-background.png`}
        alt="profile"
      />
      <Card.Body className="anime-card__content">
        <Link to={`/user/${props.id}`} key={props.id}>
          <Button className="userslistcard__btn" variant="primary">
            SEE PROFILE
          </Button>
        </Link>
      </Card.Body>
      <Card.Body className="userslistcard--body">
        <Card.Title className="userslistcard--body__header">
          {props.name}
        </Card.Title>
        <Card.Text className="userslistcard--body__text">
          Animes Listed: {props.animes.length}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default NewUserCard;
//        src={`${process.env.REACT_APP_IMAGE_URL}/${props.image}`}
