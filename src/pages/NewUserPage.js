import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Image, Row, Button, Card, Col } from "react-bootstrap";
import NewAnimeCard from "../components/NewAnimeCard";
import { useHttpClient } from "../hooks/http-hook";

const NewUserPage = () => {
  const userId = useParams().id;
  const [animeWatchingList, setAnimeWatchingList] = useState([]);
  const [animeWatchedList, setAnimeWatchedList] = useState([]);
  const [animeToWatchList, setAnimeToWatchList] = useState([]);
  const [animeDroppedList, setAnimeDroppedList] = useState([]);
  const [type, setType] = useState("");
  const [animesCopy, setAnimesCopy] = useState([]);
  const [sortType, setSortType] = useState("default");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showWatchingHandler = () => {
    setType("watching");
  };

  const showWatchedHandler = () => {
    setType("watched");
  };

  const showToWatchHandler = () => {
    setType("toWatch");
  };

  const showDroppedHandler = () => {
    setType("dropped");
  };

  useEffect(() => {
    let watchingList = [];
    let watchedList = [];
    let toWatchList = [];
    let droppedList = [];

    const getAnimes = async () => {
      try {
        const animeList = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/animes/user/${userId}`
        );
        console.log(animeList);
        // await fetch(`http://localhost:5000/api/animes/user/${id}`, {method: 'GET', body: null, methods: {}})
        // const animeList = await animeResponse.json();
        animeList.animes.forEach((anime) => {
          console.log(anime.type);
          if (anime.type === "watched") {
            watchedList.push(anime);
          } else if (anime.type === "watching") {
            watchingList.push(anime);
          } else if (anime.type === "toWatch") {
            toWatchList.push(anime);
          } else if (anime.type === "dropped") {
            droppedList.push(anime);
          }
        });
        setAnimeWatchingList(watchingList);
        setAnimeWatchedList(watchedList);
        setAnimeToWatchList(toWatchList);
        setAnimeDroppedList(droppedList);
        setAnimesCopy(animeList.animes.slice()); // without slice they reference the same array. changing one woould change the other. slice returns a new reference to the new array created
      } catch (err) {}
    };
    getAnimes();
  }, [userId, sendRequest]);
  useEffect(() => {
    console.log(animeWatchedList);
  }, [animeWatchedList]);
  return (
    <Container id="userpage-container">
      <Row className="userrow">
        <Image src="/images/shikamaru-background.png"></Image>
        <Row>
          <h1>Michael Henry</h1>
        </Row>
        <Row>
          <h2>Total Anime: {animesCopy.length}</h2>
        </Row>
        <Row className="userrow-footer">
          <Button
            onClick={showWatchedHandler}
            type="button"
            className={`userrow-btn ${type === "watched" ? "active" : ""}`}
          >
            Watched
          </Button>
          <Button
            onClick={showWatchingHandler}
            type="button"
            className={`userrow-btn ${type === "watching" ? "active" : ""}`}
          >
            Watching
          </Button>
          <Button
            onClick={showToWatchHandler}
            type="button"
            className={`userrow-btn ${type === "toWatch" ? "active" : ""}`}
          >
            To-Watch
          </Button>
          <Button
            onClick={showDroppedHandler}
            type="button"
            className={`userrow-btn ${type === "dropped" ? "active" : ""}`}
          >
            Dropped
          </Button>
        </Row>
      </Row>
      <Row className="animelistrow">
        {type === "watched" &&
          animeWatchedList.map((anime) => (
            <NewAnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))}
        {type === "watching" &&
          animeWatchingList.map((anime) => (
            <NewAnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))}
        {type === "toWatch" &&
          animeToWatchList.map((anime) => (
            <NewAnimeCard
              key={anime.title}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))}
        {type === "dropped" &&
          animeDroppedList.map((anime) => (
            <NewAnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))}
      </Row>
    </Container>
  );
};

export default NewUserPage;
