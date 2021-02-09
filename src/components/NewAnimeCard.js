import React, { useState, useContext } from "react";
import { Card, Row, Button } from "react-bootstrap";
import AuthContext from "../context/auth-context";
import { Link, useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../hooks/http-hook";
import EditAnimeModal from "../components/EditAnimeModal";

const NewAnimeCard = (props) => {
  const auth = useContext(AuthContext);
  const user = useParams().id;
  const [type, setType] = useState(props.type);
  const [actionType, setActionType] = useState("add");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showModal, setShowModal] = useState(false);

  const onAddClickHandler = () => {
    // setShowForm(true);
  };

  const onEditHandler = () => {
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
      // await fetch(`http://localhost:5000/api/animes/delete/${props.aid}`, {
      //     method: 'DELETE',
      //     body: null,
      //     headers: {'Authorization': 'Bearer ' + auth.token}
      // });
      props.history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  return (
    <>
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
          type={type}
          description={props.description}
          title={props.title}
          score={props.score}
          creator={user}
          aid={props.aid}
        />
      )}
    </>
  );
};

export default NewAnimeCard;
