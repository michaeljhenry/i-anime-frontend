import React, { useState, useContext } from "react";
import { Card, Row, Button } from "react-bootstrap";
import AuthContext from "../context/auth-context";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import EditAnimeModal from "../components/EditAnimeModal";
import LoaderSpinner from "../components/Loader";
import Message from "../components/Message";

const NewAnimeCard = (props) => {
  const auth = useContext(AuthContext);
  const user = useParams().id;
  const [type, setType] = useState(props.type);
  const [actionType, setActionType] = useState("add");
  const { isLoading, error, sendRequest } = useHttpClient();
  const [showModal, setShowModal] = useState(false);

  const onAddClickHandler = () => {
    // setShowForm(true);
    setActionType("add");
    setShowModal(true);
  };

  const onEditHandler = () => {
    setActionType("edit");
    setShowModal(true);
  };
  const onCloseHandler = () => {
    setShowModal(false);
  };

  const onDeleteHandler = async () => {
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/delete/${props.aid}`,
        "DELETE",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      window.parent.location = window.parent.location.href;
    } catch (err) {}
  };
  return (
    <>
      {error && <Message variant="danger">{error.message}</Message>}
      {isLoading && <LoaderSpinner />}
      <Card className="animelistcard">
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
              <Card.Text className="animelistcard-body__footer-center">
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
                <Button className="edit-btn" onClick={onEditHandler}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="delete-btn"
                  onClick={onDeleteHandler}
                >
                  Delete
                </Button>
              </>
            ) : null}
          </Row>
        </Card.Body>
      </Card>
      {showModal && (
        <EditAnimeModal
          show={showModal}
          onCloseHandler={onCloseHandler}
          type={actionType === "edit" ? type : ""}
          description={actionType === "edit" ? props.description : ""}
          synopsis={props.synopsis}
          image_url={props.image_url}
          title={props.title}
          score={actionType === "edit" ? props.score : ""}
          creator={user}
          aid={actionType === "edit" ? props.aid : null}
          actionType={actionType}
        />
      )}
    </>
  );
};

export default NewAnimeCard;
