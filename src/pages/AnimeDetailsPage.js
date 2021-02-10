import React, { useState, useEffect } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";

import { useHttpClient } from "../hooks/http-hook";

const AnimeDetailsPage = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [anime, setAnime] = useState(null);
  useEffect(() => {
    const getAnime = async () => {
      const response = await sendRequest(
        `https://api.jikan.moe/v3/anime/11741`
      );
      console.log(response);
      setAnime(response);
    };
    getAnime();
  }, [sendRequest]);
  return (
    <Container className="animedetailscontainer">
      {anime && (
        <React.Fragment>
          <Row className="animedetailsrow">
            <h1>{anime.title}</h1>
            <h4>Premiered {anime.premiered} &nbsp;</h4>
            <h4>{anime.type}</h4>
          </Row>
          <Row className="animedetailsrowbody">
            <Col className="animelistdetailsrowbody--col" lg={4}>
              <Image
                className="animedetailsrowbody--image"
                src={anime.image_url}
              ></Image>
            </Col>
            <Col className="animelistdetailsrowbody--col" lg={8}>
              <p className="animedetailsrowbody--synopsis">{anime.synopsis}</p>
              <p className="animedetailsrowbody--p">
                Genres:&nbsp;
                {anime.genres.map((genre, index) => (
                  <span key={genre.name}>
                    {genre.name}
                    {index !== anime.genres.length - 1 && ","}{" "}
                  </span>
                ))}
              </p>
              <p className="animedetailsrowbody--p">Score: {anime.score}</p>
            </Col>
          </Row>
          <h1 id="animelistdetails--trailerheading">PREVIEW</h1>
          <Row>
            <iframe
              title={"anime-trailer"}
              width="100%"
              height="400"
              src={anime.trailer_url}
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default AnimeDetailsPage;
