import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Row, Button } from "react-bootstrap";
import authContext from "../context/auth-context";
import NewAnimeCard from "../components/NewAnimeCard";
import { useHttpClient } from "../hooks/http-hook";
import Message from "../components/Message";
import LoaderSpinner from "../components/Loader";
import EditProfileModal from "../components/EditProfileModal";

const NewUserPage = () => {
  const userId = useParams().id;
  const auth = useContext(authContext);
  const id = auth.userId;
  const [animeWatchingList, setAnimeWatchingList] = useState([]);
  const [animeWatchedList, setAnimeWatchedList] = useState([]);
  const [animeToWatchList, setAnimeToWatchList] = useState([]);
  const [animeDroppedList, setAnimeDroppedList] = useState([]);
  const [type, setType] = useState("watched");
  const [animesCopy, setAnimesCopy] = useState([]);
  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [sortType, setSortType] = useState("default");
  const { isLoading, error, sendRequest } = useHttpClient();

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

  const onCloseHandler = () => {
    setShowModal(false);
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
        // await fetch(`http://localhost:5000/api/animes/user/${id}`, {method: 'GET', body: null, methods: {}})
        // const animeList = await animeResponse.json();
        animeList.animes.forEach((anime) => {
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
    const getUser = async () => {
      try {
        const userInfo = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/user/${userId}`
        );
        setUserData(userInfo);
      } catch (err) {}
    };
    getUser();
  }, [userId, sendRequest]);

  return (
    <Container id="userpage-container">
      {error && <Message variant="danger">{error.message}</Message>}
      {isLoading && <LoaderSpinner />}
      {!isLoading && (
        <React.Fragment>
          <Row className="userrow">
            <Row>
              <Image
                style={userId === id ? { marginLeft: "4.8rem" } : null}
                src={`${process.env.REACT_APP_IMAGE_URL}/${userData.image}`}
                alt="profile"
              ></Image>
              {userId === id && (
                <i
                  onClick={() => setShowModal(true)}
                  className="fas fa-user-edit"
                ></i>
              )}
            </Row>
            <Row>
              <h1>{userData.name}</h1>
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
              (animeWatchedList.length > 0 ? (
                animeWatchedList.map((anime) => (
                  <NewAnimeCard
                    key={anime.title}
                    score={anime.score}
                    description={anime.description}
                    synopsis={anime.synopsis}
                    aid={anime._id}
                    title={anime.title}
                    image_url={anime.image_url}
                    type={anime.type}
                    creator={anime.creator}
                  />
                ))
              ) : (
                <Message>No Anime In This List</Message>
              ))}
            {type === "watching" &&
              (animeWatchingList.length > 0 ? (
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
                ))
              ) : (
                <Message>No Anime In This List</Message>
              ))}
            {type === "toWatch" &&
              (animeToWatchList.length > 0 ? (
                animeToWatchList.map((anime) => (
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
                ))
              ) : (
                <Message>No Anime In This List</Message>
              ))}
            {type === "dropped" &&
              (animeDroppedList.length > 0 ? (
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
                ))
              ) : (
                <Message>No Anime In This List</Message>
              ))}
          </Row>
        </React.Fragment>
      )}
      {showModal && (
        <EditProfileModal
          onCloseHandler={onCloseHandler}
          show={showModal}
          userId={id}
          oldImage={userData.image}
          token={auth.token}
        />
      )}
    </Container>
  );
};

export default NewUserPage;
