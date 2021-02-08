import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Form,
  Image,
  Row,
  Dropdown,
  InputGroup,
  FormControl,
} from "react-bootstrap";

const EditAnimeModal = (props) => {
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
  const [score, setScore] = useState(Number(props.score) || "");
  const [newType, setNewType] = useState("");
  const [description, setDescription] = useState(props.description || "");
  const [charactersRemaining, setCharactersRemaining] = useState(
    200 - props.description.length
  );

  const textareaChangeHandler = (e) => {
    console.log(e.target.value);
    if (e.target.value.length <= 200) {
      setDescription(e.target.value);
      setCharactersRemaining(200 - e.target.value.length);
    }
  };

  useEffect(() => {
    console.log(score);
  }, [score]);
  return (
    <Modal
      className="editmodal"
      show={props.show}
      onHide={props.onCloseHandler}
    >
      <Modal.Header className="editmodal--header" closeButton>
        <Modal.Title>
          <h2>Edit Anime</h2>
        </Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body className="editmodal--body">
          <h3>{props.title}</h3>
          <Row className="editmodal--row__vert">
            <h4>* Select A Type</h4>
            <Row className="editmodal--radiocontainer">
              <Form.Check
                className="editmodal--radios"
                inline
                name="type"
                label="Watched"
                type="radio"
                id="watched"
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
                onChange={(e) => setNewType(e.target.id)}
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
                onChange={(e) => setNewType(e.target.id)}
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
                onChange={(e) => setNewType(e.target.id)}
              />
            </Row>
          </Row>
          {!newType ||
            (newType !== "toWatch" && (
              <Form.Group>
                <Row className="editmodal--row__vert">
                  <h4>* Select a score</h4>
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
          <Button variant="secondary" onClick={props.onCloseHandler}>
            Close
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={props.onCloseHandler}
            disabled={!newType || (newType !== "toWatch" && !score)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditAnimeModal;
