import React, { useState, useContext } from "react";
import { Card, Row, Button } from "react-bootstrap";
import AuthContext from "../context/auth-context";
import { Link, useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";

const NewAnimeCard = (props) => {
  const auth = useContext(AuthContext);
  const user = useParams().id;
  const [type, setType] = useState("");
  const [actionType, setActionType] = useState("add");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  console.log(user);
  console.log(auth);
  console.log(user === auth.userId);

  const onAddClickHandler = () => {
    // setShowForm(true);
  };
  const onWatchedHandler = async () => {
    setType("watched");
    setActionType("update");
    //setShowForm(true);
  };
  const onToWatchHandler = async () => {
    setType("toWatch");
    setActionType("update");
    //setShowForm(true);
  };
  const onWatchingHandler = async () => {
    setType("watching");
    setActionType("update");
    // setShowForm(true);
  };
  const onDroppedHandler = async () => {
    setType("dropped");
    setActionType("update");
    // setShowForm(true);
  };

  const onDeleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/delete/${props.aid}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      // await fetch(`http://localhost:5000/api/animes/delete/${props.aid}`, {
      //     method: 'DELETE',
      //     body: null,
      //     headers: {'Authorization': 'Bearer ' + auth.token}
      // });
      props.history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  return (
    <Card className="animelistcard" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`${props.image_url}`} />
      <Card.Body className="animelistcard-body">
        <Card.Title className="animelistcard-body__header">
          {props.title}
        </Card.Title>
        <Card.Text className="animelistcard-body__desc">
          {props.description}
        </Card.Text>
        {auth.isLoggedIn && (
          <Card.Text>
            User Rating: {props.score ? props.score : "No Rating"}
          </Card.Text>
        )}
        <Row className="animelistcard-body__footer">
          {!auth.isLoggedIn && (
            <Card.Text>
              User Rating: {props.score ? props.score : "No Rating"}
            </Card.Text>
          )}
          {auth.isLoggedIn && user !== auth.userId && (
            <Button onClick={onAddClickHandler} className="edit-btn">
              Add To My List
            </Button>
          )}
          {user === auth.userId ? (
            <>
              <Button className="edit-btn">Edit</Button>
              <Button
                variant="danger"
                className="delete-btn"
                onClick={onDeleteHandler}
              >
                Delete
              </Button>
              {props.type === "toWatch" && (
                <Row>
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </Button>
                </Row>
              )}
              {props.type === "watched" && (
                <Row className="edit-buttons__row">
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </Button>
                </Row>
              )}
              {props.type === "watching" && (
                <Row className="edit-buttons__row">
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </Button>
                </Row>
              )}
              {props.type === "dropped" && (
                <Row className="edit-buttons__row">
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </Button>
                  <Button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </Button>
                </Row>
              )}
            </>
          ) : null}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default NewAnimeCard;
