import React, { useState, useEffect, useContext, useRef } from "react";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Message from "../components/Message";
import LoaderSpinner from "../components/Loader";
import { Form, Button, Row, InputGroup, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AnimeSearchCard from "./AnimeSearchCard";
import EditAnimeModal from "./EditAnimeModal";
import useWindowSize from "../hooks/useWindowSize";

const NewAnimeForm = (props) => {
  const [chosenAnimeIndex, setChosenAnimeIndex] = useState("");
  const [chosenAnime, setChosenAnime] = useState("");
  const [animeList, setAnimeList] = useState("");
  const auth = useContext(AuthContext);
  const animeSearchRow = useRef(null);
  const recommendedAnimeRow = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [recommended, setRecommended] = useState(false);

  const size = useWindowSize();
  const { isLoading, error, sendRequest } = useHttpClient();
  const showLessHandler = (e) => {
    if (e.target.id === "search") {
      animeSearchRow.current.scrollLeft =
        animeSearchRow.current.scrollLeft - size.width * 0.85 + 40;
    } else if (e.target.id === "recommended") {
      recommendedAnimeRow.current.scrollLeft =
        recommendedAnimeRow.current.scrollLeft - size.width + 240;
    }
  };
  const showMoreHandler = (e) => {
    if (e.target.id === "search") {
      animeSearchRow.current.scrollLeft =
        animeSearchRow.current.scrollLeft + size.width * 0.85 - 40;
    } else if (e.target.id === "recommended") {
      recommendedAnimeRow.current.scrollLeft =
        recommendedAnimeRow.current.scrollLeft + size.width - 240;
    }
  };

  const onCloseHandler = () => {
    setShowModal(false);
    setChosenAnimeIndex("");
    setChosenAnime("");
  };

  useEffect(() => {
    if (chosenAnimeIndex !== "") {
      setChosenAnime(props.animeList[chosenAnimeIndex].title);
      setShowModal(true);
    }
  }, [chosenAnimeIndex, props.animeList]);

  const showRecommendedHandler = () => {
    setAnimeList([]);
  };

  useEffect(() => {
    setChosenAnimeIndex("");
    setChosenAnime("");
    setAnimeList(props.animeList);
  }, [props.animeList]);

  useEffect(() => {
    const baseUrl = "https://api.jikan.moe/v3";

    const getAnime = async () => {
      const response = await sendRequest(`${baseUrl}/anime/1/recommendations`);
      setRecommended(response.recommendations);
    };
    getAnime();
  }, [sendRequest]);

  return (
    <React.Fragment>
      {isLoading && <LoaderSpinner />}
      {error && <Message variant="danger">{error.message}</Message>}
      {animeList.length > 0 && (
        <React.Fragment>
          <Row>
            <Button
              className="recommended--btn"
              onClick={showRecommendedHandler}
            >
              Show Recommended Anime
            </Button>
          </Row>
          <Row className="separator-row">
            <h1>Choose an anime</h1>
            <hr className="separator__black"></hr>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showLessHandler}
              id="search"
            >
              {`<`}
            </Button>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showMoreHandler}
              id="search"
            >
              {`>`}
            </Button>
          </Row>
          <Row className="animesearchcards--row" ref={animeSearchRow}>
            {animeList.map((anime, index) => (
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
          {chosenAnime && showModal && (
            <EditAnimeModal
              show={showModal}
              onCloseHandler={onCloseHandler}
              type=""
              description=""
              mal_id={props.animeList[chosenAnimeIndex].mal_id}
              synopsis={props.animeList[chosenAnimeIndex].synopsis}
              image_url={props.animeList[chosenAnimeIndex].image_url}
              title={props.animeList[chosenAnimeIndex].title}
              score={""}
              creator={auth.userId}
              aid={null}
              actionType={"add"}
            />
          )}
        </React.Fragment>
      )}
      {recommended.length > 0 && animeList.length === 0 && (
        <React.Fragment>
          <Message className="alert-small__center">
            Don't know what to search?<br></br>Try one of these!
          </Message>
          <Row className="separator-row">
            <h1>Suggested anime</h1>
            <hr className="separator__black"></hr>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showLessHandler}
              id="recommended"
            >
              {`<`}
            </Button>
            <Button
              variant="dark"
              className="scroll-btn"
              onClick={showMoreHandler}
              id="recommended"
            >
              {`>`}
            </Button>
          </Row>
          <Row className="dash-row" ref={recommendedAnimeRow}>
            {recommended.map((anime) => (
              <Card key={anime.title} className="anime-card">
                <Card.Img
                  className="anime-card__image"
                  variant="top"
                  src={`${anime.image_url}`}
                />
                <Card.Body className="anime-card__content">
                  <Card.Title className="anime-card__content-title">
                    {anime.title}
                  </Card.Title>
                  <Link to={`/animedetails/${anime.mal_id}`} key={anime.title}>
                    <Button className="anime-card__btn" variant="primary">
                      SEE DETAILS
                    </Button>
                  </Link>

                  <div className="anime-card__footer">
                    <Card.Text>{anime.type}</Card.Text>
                    {anime.start_date && (
                      <Card.Text>{anime.start_date}</Card.Text>
                    )}
                  </div>
                </Card.Body>
                <Row className="newfooter--container">
                  <Row className="newfooter__bottom">{anime.title}</Row>
                </Row>
              </Card>
            ))}
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default NewAnimeForm;

/* <Form onSubmit={onSubmitHandler} className="animeform">
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

            <Row className="separator-row" ref={form}>
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
          </Form> */
