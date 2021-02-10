import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import NewAnimeForm from "../components/NewAnimeForm";
import NewAnimeSearch from "../components/NewAnimeSearch";

const NewAddAnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  let array = [];
  useEffect(() => {
    ////console.log(animeList);
  }, [animeList]);

  const getInfo = (animeInfo) => {
    // try useEffect to update animeList

    if (animeInfo.results.length > 10) {
      for (var i = 0; i < 10; i++) {
        array.push(animeInfo.results[i]);
      }
    } else {
      for (var j = 0; j < animeInfo.results.length; j++) {
        array.push(animeInfo.results[j]);
      }
    }
    //console.log(array);
    //setAnimeList([animeInfo.results[0], animeInfo.results[1], animeInfo.results[2]]);
    setAnimeList(array);
  };
  return (
    <Container className="addanimepage--container">
      <NewAnimeSearch getInfo={getInfo} />
      <NewAnimeForm type="watched" animeList={animeList} />
    </Container>
  );
};

export default NewAddAnimePage;
