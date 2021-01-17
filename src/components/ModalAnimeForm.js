import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../components/Loader";
import "../pages/Anime.css";
import ErrorModal from "./ErrorModal";
import { useHistory } from "react-router-dom";

const ModalAnimeForm = (props) => {
  const auth = useContext(AuthContext);

  const [description, setDescription] = useState(
    props.actionType === "add" ? "" : props.description
  );
  const [charactersRemaining, setCharactersRemaining] = useState(200);
  const [score, setScore] = useState("");
  const [type, setType] = useState("watched");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  let history = useHistory();

  const scoreChangeHandler = (e) => {
    setScore(e.target.value);
  };
  const typeChangeHandler = (e) => {
    setType(e.target.value);
  };
  const textareaChangeHandler = (e) => {
    if (e.target.value.length <= 200) {
      setDescription(e.target.value);
      setCharactersRemaining(200 - e.target.value.length);
    }
  };
  const clickedEvent = async (e) => {
    e.preventDefault();
    const data = {
      title: props.title,
      description: description,
      image_url: props.image_url,
      synopsis: props.synopsis,
      score: score,
      creator: auth.userId,
      type: props.actionType === "add" ? type : props.type,
      animeId: props.animeId,
    };

    //console.log(data);
    if (props.actionType === "add") {
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
        // await fetch(`http://localhost:5000/api/animes/add/${type}`, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + auth.token
        //     }
        // });
        setDescription("");
        props.onCancel(); // if i swap the order of this line and the line below, it will tell me a warning about performing state updates on unmounted components.
      } catch (err) {}
    }
    if (props.actionType === "update") {
      const data = {
        description,
        creator: props.creator,
        type: props.type,
        score: score || props.score,
      };
      try {
        await sendRequest(
          process.env.REACT_APP_BACKEND_URL +
            `/animes/patch/type/${props.animeId}`,
          "PATCH",
          JSON.stringify(data),
          {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          }
        );
        history.push(`/${auth.userId}/animes`);
      } catch (err) {}
    }
  };

  useEffect(() => {
    console.log(props.type, props.actionType);
  }, [props.type, props.actionType]);
  return (
    <React.Fragment>
      {error && (
        <ErrorModal error={error} show={!!error} onCancel={clearError} />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <form onSubmit={clickedEvent}>
          <div className="anime-form__info">
            <React.Fragment>
              <div>
                <img src={props.image_url} alt="anime" />
                <b>{props.title}</b>
              </div>
              <div className="modal-form__instructions">
                {type === "watched" && (
                  <div>
                    * Provide a score<br></br>
                  </div>
                )}
                {(type === "watching" || type === "dropped") && (
                  <div>
                    Score is optional<br></br>
                  </div>
                )}
                Thoughts are optional
                <br></br>
              </div>
            </React.Fragment>
          </div>
          {props.actionType === "add" && (
            <React.Fragment>
              <div className="modal-form__type" onChange={typeChangeHandler}>
                <p>Anime Type: </p>
                <select name="animeType" id="animeType">
                  <option value="watched">Watched</option>
                  <option value="watching">Watching</option>
                  <option value="toWatch">ToWatch</option>
                  <option value="dropped">Dropped</option>
                </select>
              </div>
              {(type === "watched" ||
                type === "watching" ||
                type === "dropped") && (
                <div
                  className="modal-form__score"
                  onChange={scoreChangeHandler}
                >
                  <p>Anime Score: </p>
                  <select name="scores" id="scores">
                    <option value=""> </option>
                    <option value="0.0">0.0</option>
                    <option value="0.5">0.5</option>
                    <option value="1.0">1.0</option>
                    <option value="1.5">1.5</option>
                    <option value="2.0">2.0</option>
                    <option value="2.5">2.5</option>
                    <option value="3.0">3.0</option>
                    <option value="3.5">3.5</option>
                    <option value="4.0">4.0</option>
                    <option value="4.5">4.5</option>
                    <option value="5.0">5.0</option>
                    <option value="5.5">5.5</option>
                    <option value="6.0">6.0</option>
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0">8.0</option>
                    <option value="8.5">8.5</option>
                    <option value="9.0">9.0</option>
                    <option value="9.5">9.5</option>
                    <option value="10.0">10.0</option>
                  </select>
                </div>
              )}
            </React.Fragment>
          )}
          {props.actionType === "update" && (
            <React.Fragment>
              <div
                className="modal-form__type"
                onChange={typeChangeHandler}
              ></div>
              {(props.type === "watched" ||
                props.type === "watching" ||
                props.type === "dropped") && (
                <div
                  className="modal-form__score"
                  onChange={scoreChangeHandler}
                >
                  <p>Anime Score: </p>
                  <select defaultValue={props.score} name="scores" id="scores">
                    <option value={props.score}>{props.score}</option>
                    <option value="0.0">0.0</option>
                    <option value="0.5">0.5</option>
                    <option value="1.0">1.0</option>
                    <option value="1.5">1.5</option>
                    <option value="2.0">2.0</option>
                    <option value="2.5">2.5</option>
                    <option value="3.0">3.0</option>
                    <option value="3.5">3.5</option>
                    <option value="4.0">4.0</option>
                    <option value="4.5">4.5</option>
                    <option value="5.0">5.0</option>
                    <option value="5.5">5.5</option>
                    <option value="6.0">6.0</option>
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0">8.0</option>
                    <option value="8.5">8.5</option>
                    <option value="9.0">9.0</option>
                    <option value="9.5">9.5</option>
                    <option value="10.0">10.0</option>
                  </select>
                </div>
              )}
            </React.Fragment>
          )}
          <textarea
            onChange={textareaChangeHandler}
            placeholder="200 characters to express thoughts or feelings about the anime you watched or why you want to watch it..."
            value={description}
          ></textarea>
          <div className="text-background">
            <p>Characters Remaining: {charactersRemaining}</p>
          </div>

          {props.actionType === "add" &&
            (type === "watched" ? (
              <button disabled={!score} type="submit">
                <h3>Add Anime</h3>
              </button>
            ) : (
              <button type="submit">
                <h3>Add Anime </h3>
              </button>
            ))}
          {props.actionType === "update" &&
            (props.type === "watched" ? (
              <button disabled={!props.score && !score} type="submit">
                <h3>Update</h3>
              </button>
            ) : (
              <button type="submit">
                <h3>Update</h3>
              </button>
            ))}
        </form>
      )}
    </React.Fragment>
  );
};

export default ModalAnimeForm;
