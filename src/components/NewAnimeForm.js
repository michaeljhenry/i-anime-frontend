import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Message from "../components/Message";
import LoaderSpinner from "../components/Loader";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import AnimeSearchCard from "./AnimeSearchCard";
import useWindowSize from "../hooks/useWindowSize";

const NewAnimeForm = (props) => {
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
  const [chosenAnimeIndex, setChosenAnimeIndex] = useState("");
  const [chosenAnime, setChosenAnime] = useState("");
  const auth = useContext(AuthContext);
  const [score, setScore] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [charactersRemaining, setCharactersRemaining] = useState(200);
  const animeSearchRow = useRef(null);
  const size = useWindowSize();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const showLessHandler = (e) => {
    animeSearchRow.current.scrollLeft =
      animeSearchRow.current.scrollLeft - size.width * 0.85 + 40;
  };
  const showMoreHandler = (e) => {
    animeSearchRow.current.scrollLeft =
      animeSearchRow.current.scrollLeft + size.width * 0.85 - 40;
  };

  const textareaChangeHandler = (e) => {
    if (e.target.value.length <= 200) {
      setDescription(e.target.value);
      setCharactersRemaining(200 - e.target.value.length);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    clearError();

    const data = {
      title: chosenAnime,
      description: description,
      image_url: props.animeList[chosenAnimeIndex].image_url,
      synopsis: props.animeList[chosenAnimeIndex].synopsis,
      mal_id: props.animeList[chosenAnimeIndex].mal_id,
      score: score,
      creator: auth.userId,
      type: type,
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/add`,
        "POST",
        JSON.stringify(data),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setType("");
      setScore("");
      setDescription("");
    } catch (err) {}
  };

  useEffect(() => {
    if (chosenAnimeIndex !== "") {
      setChosenAnime(props.animeList[chosenAnimeIndex].title);
    }
  }, [chosenAnimeIndex, props.animeList]);

  useEffect(() => {
    setChosenAnimeIndex("");
    setChosenAnime("");
  }, [props.animeList]);

  return (
    <>
      {isLoading && <LoaderSpinner />}
      {error && <Message>{error.message}</Message>}
      {props.animeList.length > 0 && (
        <React.Fragment>
          <Row className="separator-row">
            <h1>* Choose an anime</h1>
            <hr className="separator"></hr>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showLessHandler}
            >
              <h1 id="airing">{`<`}</h1>
            </Button>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showMoreHandler}
            >
              <h1 id="airing">{`>`}</h1>
            </Button>
          </Row>
          <Form onSubmit={onSubmitHandler} className="animeform">
            <Row className="animesearchcards--row" ref={animeSearchRow}>
              {props.animeList.map((anime, index) => (
                <Form.Check
                  key={anime.title}
                  className={`animesearchcard--radio ${
                    chosenAnimeIndex === index ? "active" : ""
                  }`}
                  name="anime-select"
                  id={`cb-${index}`}
                  type="radio"
                  label={
                    <AnimeSearchCard
                      title={anime.title}
                      synopsis={anime.synopsis}
                      score={anime.score}
                      image_url={anime.image_url}
                      url={anime.url}
                    />
                  }
                  onClick={() => setChosenAnimeIndex(index)}
                />
              ))}
            </Row>

            <Row className="separator-row">
              <h1>* Select a type</h1>
              <hr className="separator"></hr>
            </Row>
            <Row className="animeform--row__vert">
              <Row className="animeform--radiocontainer">
                <Form.Check
                  className="animeform--radios"
                  inline
                  name="type"
                  label="Watched"
                  type="radio"
                  id="watched"
                  value="watched"
                  onChange={(e) => {
                    setScore("");
                    setType(e.target.id);
                  }}
                  checked={"watched" === type}
                />
              </Row>
              <Row className="animeform--radiocontainer">
                <Form.Check
                  className="animeform--radios"
                  inline
                  name="type"
                  label="To Watch"
                  type="radio"
                  id="toWatch"
                  value="toWatch"
                  onChange={(e) => setType(e.target.id)}
                  checked={"toWatch" === type}
                />
              </Row>
              <Row className="animeform--radiocontainer">
                <Form.Check
                  className="animeform--radios"
                  inline
                  name="type"
                  label="Watching"
                  type="radio"
                  id="watching"
                  value="watching"
                  onChange={(e) => setType(e.target.id)}
                  checked={"watching" === type}
                />
              </Row>
              <Row className="animeform--radiocontainer">
                <Form.Check
                  className="animeform--radios"
                  inline
                  name="type"
                  label="Dropped"
                  type="radio"
                  id="dropped"
                  value="dropped"
                  onChange={(e) => setType(e.target.id)}
                  checked={"dropped" === type}
                />
              </Row>
            </Row>
            {type !== "toWatch" && (
              <React.Fragment>
                <Row className="separator-row">
                  <h1>* Select a score</h1>
                  <hr className="separator"></hr>
                </Row>
                <Form.Group>
                  <Row className="animeform--row__vert">
                    <Row className="animeform--row__horz">
                      <InputGroup>
                        {numbers.map((number) => (
                          <Button
                            key={number}
                            className={`animeform--scorebtn${
                              score === number ? "__active" : ""
                            }`}
                            variant="outline-secondary"
                            type="button"
                            onClick={() => setScore(number)}
                          >
                            {number}
                          </Button>
                        ))}
                      </InputGroup>
                    </Row>
                  </Row>
                </Form.Group>
              </React.Fragment>
            )}
            <Row className="separator-row">
              <h1>Express thoughts</h1>
              <hr className="separator"></hr>
            </Row>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Row className="animeform--row__vert">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Express your feelings about the anime or why you want to watch it"
                  className=" animeform--textarea"
                  value={description}
                  onChange={textareaChangeHandler}
                />
                <h4>Characters remaining: {charactersRemaining}</h4>
              </Row>
            </Form.Group>
            {type !== "toWatch" ? (
              <Button
                disabled={!type || !chosenAnime || !score}
                type="submit"
                className="animeform--btn"
              >
                Add Anime
              </Button>
            ) : (
              <Button
                disabled={!type || !chosenAnime}
                type="submit"
                className="animeform--btn"
              >
                Add Anime
              </Button>
            )}
          </Form>
        </React.Fragment>
      )}
    </>
  );
};

export default NewAnimeForm;
