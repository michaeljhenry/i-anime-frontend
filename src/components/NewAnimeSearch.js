import React, { useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import LoaderSpinner from "../components/Loader";

const NewAnimeSearch = (props) => {
  const baseUrl = "https://api.jikan.moe/v3";
  const { isLoading, error, sendRequest } = useHttpClient();
  const [anime, setAnime] = useState("");
  const getValue = (e) => {
    e.preventDefault();
    //console.log(anime);
    request();
  };
  const request = async () => {
    try {
      const response = await sendRequest(`${baseUrl}/search/anime?q=${anime}`);
      console.log(response);
      // const response = await sendRequest(`${baseUrl}/search/anime?q=${anime}&page=1&type=tv&order_by=state_date`); // THIS ADDS A FILTER

      // await fetch(`${baseUrl}/search/anime?q=${anime}&page=1&type=tv`)
      // .then(res => res.json())
      // console.log(response);
      props.getInfo(response);
    } catch (err) {
      console.log(err);
    }
    ////console.log(response.results[0]);
    // .then(res => res.json())
    // .then(data => //console.log(data.results[0].synopsis))
    // .catch(err => //console.log.warn(err.message));
  };
  return (
    <React.Fragment>
      {isLoading && <LoaderSpinner />}
      <Form onSubmit={getValue} className="animesearchform">
        {error && <Message>{error.message}</Message>}
        <Form.Group className="animesearchform--row">
          <Form.Control
            onChange={(e) => setAnime(e.target.value)}
            size="lg"
            type="text"
            placeholder="Enter an anime title"
          />
          <Button variant="light" type="submit">
            <i className="fas fa-search"></i>
          </Button>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};

export default NewAnimeSearch;
