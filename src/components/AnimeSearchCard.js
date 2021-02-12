import React from "react";
import { Card, Row } from "react-bootstrap";

const AnimeSearchCard = (props) => {
  return (
    <Card className="animesearchcard">
      <Card.Img variant="top" src={`${props.image_url}`} />
      <Card.Body className="animesearchcard--contentcontainer">
        <Card.Body className="animesearchcard--content">
          {props.synopsis}
        </Card.Body>
        <Row className="animesearchcard--contentlink">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            Read More Here
          </a>
        </Row>
      </Card.Body>
      <Row className="newfooter--container">
        <Row className="newfooter">{props.title}</Row>
        <Row className="newfooter__bottom">
          <i className="fas fa-star"></i>&nbsp;
          {props.score ? `Score: ${props.score}` : "No score available"}
        </Row>
      </Row>
    </Card>
  );
};

export default AnimeSearchCard;

/*

      <Card.Body className="animesearchcard-body">
        <Card.Title className="animesearchcard-body__header">
          {props.title}
        </Card.Title>
        <Card.Body className="anime-card__content">{props.synopsis}</Card.Body>
        <Row className="animesearchcard-body__footer">
          <Card.Text className="animesearchcard-body__footer-center">
            Rating: {props.score ? props.score : "No Rating"}
          </Card.Text>
        </Row>
      </Card.Body>
      <Row className="animelistcard-body__footer-center">
        <a href={props.url} target="_blank" rel="noopener noreferrer">
          Read More Here
        </a>
      </Row>

*/
