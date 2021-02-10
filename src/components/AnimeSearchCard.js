import React from "react";
import { Card, Row } from "react-bootstrap";

const AnimeSearchCard = (props) => {
  return (
    <Card className="animesearchcard">
      <Card.Img variant="top" src={`${props.image_url}`} />
      <Card.Body className="animesearchcard-body">
        <Card.Title className="animesearchcard-body__header">
          {props.title}
        </Card.Title>
        <Card.Text className="animesearchcard-body__desc">
          {props.synopsis}
        </Card.Text>
        <Row className="animesearchcard-body__footer">
          <Card.Text className="animesearchcard-body__footer-center">
            Rating: {props.score ? props.score : "No Rating"}
          </Card.Text>
        </Row>
        <Row className="animelistcard-body__footer-center">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            Read More Here
          </a>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default AnimeSearchCard;
