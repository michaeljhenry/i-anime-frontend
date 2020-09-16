import React, { useContext, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import Modal from "./Modal";
import ModalAnimeForm from "./ModalAnimeForm";
import LoadingSpinner from "./Loader";
import ErrorModal from "./ErrorModal";

const AnimeCard = (props) => {
  const user = useParams().id.substring(1);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [showForm, setShowForm] = useState(false);
  let history = useHistory();

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
      history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  const onWatchedHandler = async () => {
    const data = {
      creator: props.creator,
      type: "watched",
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/patch/type/${props.aid}`,
        "PATCH",
        JSON.stringify(data),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  const onToWatchHandler = async () => {
    const data = {
      creator: props.creator,
      type: "toWatch",
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/patch/type/${props.aid}`,
        "PATCH",
        JSON.stringify(data),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  const onWatchingHandler = async () => {
    const data = {
      creator: props.creator,
      type: "watching",
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/patch/type/${props.aid}`,
        "PATCH",
        JSON.stringify(data),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  const onDroppedHandler = async () => {
    const data = {
      creator: props.creator,
      type: "dropped",
    };
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/animes/patch/type/${props.aid}`,
        "PATCH",
        JSON.stringify(data),
        {
          Authorization: "Bearer " + auth.token,
          "Content-Type": "application/json",
        }
      );
      history.push(`/${auth.userId}/animes`);
    } catch (err) {}
  };
  const onAddClickHandler = () => {
    setShowForm(true);
  };
  const onCancel = () => {
    setShowForm(false);
  };
  return (
    <React.Fragment>
      {error && (
        <ErrorModal error={error} show={!!error} onCancel={clearError} />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && showForm && (
        <Modal form={true} show={showForm} onCancel={onCancel}>
          <ModalAnimeForm
            title={props.title}
            image_url={props.image_url}
            synopsis={props.synopsis}
            onCancel={onCancel}
          />
        </Modal>
      )}
      {!isLoading && (
        <div className="user-list__item" key={props.title}>
          <img src={props.image_url} alt={`${props.title} `} />
          <p>{props.title}</p>
          <div className="user-list__item-description">
            <p>{props.description}</p>
          </div>
          <div>
            {props.type !== "toWatch" && (
              <p style={{ fontWeight: "bold" }}>
                {props.score ? `User Rating: ${props.score}` : `No User Rating`}
              </p>
            )}
          </div>
          {auth.isLoggedIn && user !== auth.userId && (
            <button onClick={onAddClickHandler} className="edit-btn">
              Add To My List
            </button>
          )}
          {user === auth.userId ? (
            <div className="edit-buttons">
              <ul className="edit-buttons__row">
                <Link to={`/anime/edit/${props.aid}`}>
                  <button className="edit-btn">Edit</button>
                </Link>
                <button className="delete-btn" onClick={onDeleteHandler}>
                  Delete
                </button>
              </ul>
              {props.type === "toWatch" && (
                <ul className="edit-buttons__row">
                  <button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </button>
                </ul>
              )}
              {props.type === "watched" && (
                <ul className="edit-buttons__row">
                  <button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </button>
                </ul>
              )}
              {props.type === "watching" && (
                <ul className="edit-buttons__row">
                  <button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onDroppedHandler}
                  >
                    Dropped
                  </button>
                </ul>
              )}
              {props.type === "dropped" && (
                <ul className="edit-buttons__row">
                  <button
                    className="switch-type__btn"
                    onClick={onWatchedHandler}
                  >
                    Watched
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onToWatchHandler}
                  >
                    ToWatch
                  </button>
                  <button
                    className="switch-type__btn"
                    onClick={onWatchingHandler}
                  >
                    Watching
                  </button>
                </ul>
              )}
            </div>
          ) : null}
        </div>
      )}
    </React.Fragment>
  );
};

export default AnimeCard;
