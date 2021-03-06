import React, { useState, useContext } from "react";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Message from "./Message";
import LoaderSpinner from "./Loader";

import { Modal, Button, Form, Row, InputGroup } from "react-bootstrap";

const EditAnimeModal = (props) => {
  const auth = useContext(AuthContext);

  const numbers = [
    "0.0",
    "0.5",
    "1.0",
    "1.5",
    "2.0",
    "2.5",
    "3.0",
    "3.5",
    "4.0",
    "4.5",
    "5.0",
    "5.5",
    "6.0",
    "6.5",
    "7.0",
    "7.5",
    "8.0",
    "8.5",
    "9.0",
    "9.5",
    "10.0",
  ];
  const [score, setScore] = useState(props.score || "");
  const [newType, setNewType] = useState(props.type);
  const [description, setDescription] = useState(props.description || "");
  const [charactersRemaining, setCharactersRemaining] = useState(
    200 - props.description.length
  );

  const { isLoading, error, sendRequest } = useHttpClient();

  const textareaChangeHandler = (e) => {
    // console.log(e.target.value);
    if (e.target.value.length <= 200) {
      setDescription(e.target.value);
      setCharactersRemaining(200 - e.target.value.length);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (props.actionType === "edit") {
      const newAnime = {
        title: props.title,
        description: description,
        creator: props.creator,
        type: newType, //animeInfo.type,
        score: newType === "toWatch" ? "" : score,
      };
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/animes/patch/${props.aid}`,
          "PATCH",
          JSON.stringify(newAnime),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        props.onCloseHandler();
        window.parent.location = window.parent.location.href; // page refresh
      } catch (err) {}
    } else {
      const newAnime = {
        title: props.title,
        description: description,
        synopsis: props.synopsis,
        creator: auth.userId,
        type: newType, //animeInfo.type,
        score: newType === "toWatch" ? "" : score,
        image_url: props.image_url,
        mal_id: props.mal_id ? props.mal_id : "",
      };
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/animes/add`,
          "POST",
          JSON.stringify(newAnime),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          }
        );
        props.onCloseHandler();
      } catch (err) {}
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoaderSpinner />}
      <Modal
        className="editmodal"
        show={props.show}
        onHide={props.onCloseHandler}
      >
        <Modal.Header className="editmodal--header" closeButton>
          <Modal.Title>
            {props.actionType === "edit" ? (
              <React.Fragment>
                <h2>Edit Anime</h2>
                {error && <Message variant="danger">{error.message}</Message>}
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h2>Add Anime</h2>
                {error && <Message variant="danger">{error.message}</Message>}
              </React.Fragment>
            )}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={onSubmitHandler}>
          <Modal.Body className="editmodal--body">
            <h3>{props.title}</h3>
            <Row className="editmodal--row__vert">
              <h4>Select A Type</h4>
              <Row className="editmodal--radiocontainer">
                <Form.Check
                  className="editmodal--radios"
                  inline
                  name="type"
                  label="Watched"
                  type="radio"
                  id="watched"
                  value="watched"
                  checked={"watched" === newType}
                  onChange={(e) => setNewType(e.target.id)}
                />
              </Row>
              <Row className="editmodal--radiocontainer">
                <Form.Check
                  className="editmodal--radios"
                  inline
                  name="type"
                  label="To Watch"
                  type="radio"
                  id="toWatch"
                  value="toWatch"
                  checked={"toWatch" === newType}
                  onChange={(e) => {
                    setScore("");
                    setNewType(e.target.id);
                  }}
                />
              </Row>
              <Row className="editmodal--radiocontainer">
                <Form.Check
                  className="editmodal--radios"
                  inline
                  name="type"
                  label="Watching"
                  type="radio"
                  id="watching"
                  value="watching"
                  onChange={(e) => setNewType(e.target.id)}
                  checked={"watching" === newType}
                />
              </Row>
              <Row className="editmodal--radiocontainer">
                <Form.Check
                  className="editmodal--radios"
                  inline
                  name="type"
                  label="Dropped"
                  type="radio"
                  id="dropped"
                  value="dropped"
                  onChange={(e) => setNewType(e.target.id)}
                  checked={"dropped" === newType}
                />
              </Row>
            </Row>
            {!newType ||
              (newType !== "toWatch" && (
                <Form.Group>
                  <Row className="editmodal--row__vert">
                    <h4>Select a score</h4>
                    <Row className="editmodal--row__horz">
                      <InputGroup className="mb-3">
                        {numbers.map((number) => (
                          <Button
                            onClick={() => setScore(number)}
                            key={number}
                            className={`editmodal--scorebtn${
                              score === number ? "__active" : ""
                            }`}
                            variant="outline-secondary"
                            type="button"
                          >
                            {number}
                          </Button>
                        ))}
                      </InputGroup>
                    </Row>
                    <h4>Selected score: {score}</h4>
                  </Row>
                </Form.Group>
              ))}
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Row className="editmodal--row__vert">
                <h4>Express your thoughts</h4>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Express your feelings about the anime or why you want to watch it"
                  onChange={textareaChangeHandler}
                  value={description}
                />
                <h4>Characters remaining: {charactersRemaining}</h4>
              </Row>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="editmodal--footer">
            <Button
              type="button"
              variant="secondary"
              onClick={props.onCloseHandler}
            >
              Close
            </Button>
            {props.actionType === "edit" ? (
              <Button
                type="submit"
                variant="primary"
                disabled={
                  !newType ||
                  (newType !== "toWatch" && newType !== "watching" && !score)
                }
              >
                Save Changes
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                disabled={
                  !newType ||
                  (newType !== "toWatch" && newType !== "watching" && !score)
                }
              >
                Add Anime
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default EditAnimeModal;
