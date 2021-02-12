import React, { useState, useEffect, useContext } from "react";
import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { useHttpClient } from "../hooks/http-hook";
import AuthContext from "../context/auth-context";
import LoaderSpinner from "../components/Loader";
import Message from "../components/Message";
import EditAnimeModal from "../components/EditAnimeModal";

const AnimeDetailsPage = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();
  const [anime, setAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const mal_id = useParams().id;
  const auth = useContext(AuthContext);

  const onCloseHandler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const getAnime = async () => {
      const response = await sendRequest(
        `https://api.jikan.moe/v3/anime/${mal_id}`
      );
      setAnime(response);
    };
    getAnime();
  }, [sendRequest, mal_id]);
  return (
    <Container className="animedetailscontainer">
      {isLoading && <LoaderSpinner />}
      {error && <Message variant="danger">{error.message}</Message>}
      {anime && (
        <React.Fragment>
          <Row className="animedetailsrow">
            <h1>{anime.title}</h1>
            {anime.premiered && <h4>{anime.premiered} &nbsp;</h4>}
            {anime.type && <h4>{anime.type}</h4>}
          </Row>
          <Row className="animedetailsrowbody">
            <Col className="animelistdetailsrowbody--col" lg={4}>
              <Image
                className="animedetailsrowbody--image"
                src={anime.image_url}
                alt={`${anime.title}`}
              ></Image>
            </Col>
            <Col className="animelistdetailsrowbody--col" lg={8}>
              <p className="animedetailsrowbody--synopsis">{anime.synopsis}</p>
              <p className="animedetailsrowbody--p">
                Genres:&nbsp;
                {anime.genres.length > 0 &&
                  anime.genres.map((genre, index) => (
                    <span key={genre.name}>
                      {genre.name}
                      {index !== anime.genres.length - 1 && ","}{" "}
                    </span>
                  ))}
              </p>
              {anime.score && (
                <p className="animedetailsrowbody--p">Score: {anime.score}</p>
              )}
              {auth.isLoggedIn && (
                <Button
                  onClick={() => setShowModal(true)}
                  className="animecard--btn__main"
                >
                  Add To List
                </Button>
              )}
            </Col>
          </Row>
          {anime.trailer_url && (
            <React.Fragment>
              <h1 id="animelistdetails--trailerheading">PREVIEW</h1>
              <Row>
                <iframe
                  title={"anime-trailer"}
                  width="100%"
                  height="400"
                  src={anime.trailer_url}
                  frameBorder="0"
                  allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Row>
            </React.Fragment>
          )}
          {showModal && (
            <EditAnimeModal
              show={showModal}
              onCloseHandler={onCloseHandler}
              type=""
              description=""
              mal_id={anime.mal_id}
              synopsis={anime.synopsis}
              image_url={anime.image_url}
              title={anime.title}
              score={""}
              creator={auth.userId}
              aid={null}
              actionType={"add"}
            />
          )}
        </React.Fragment>
      )}
    </Container>
  );
};

export default AnimeDetailsPage;
