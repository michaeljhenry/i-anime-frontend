import React, { useState, useEffect, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useHttpClient } from "../hooks/http-hook";
import useWindowSize from "../hooks/useWindowSize";

const AnimeDashboardPage = () => {
  const dashrowAiring = useRef(null);
  const dashrowUpcoming = useRef(null);
  const dashrowToday = useRef(null);
  const [margin, setMargin] = useState(0);
  // const [minMargin, setMinMargin] = useState(0);
  // const [maxMargin, setMaxMargin] = useState(-5510); // (29*180) + (10*29). cards + margins
  const [topAiringAnime, setTopAiringAnime] = useState([]);
  const [topUpcomingAnime, setTopUpcomingAnime] = useState([]);
  const [todayAnime, setTodayAnime] = useState([]);
  const baseUrl = "https://api.jikan.moe/v3";
  const size = useWindowSize();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showLessHandler = () => {
    /*if (margin + size.width >= 0) {
      setMargin(0);
    } else {
      setMargin((prev) => prev + size.width - 200);
    }*/
    dashrowAiring.current.scrollLeft =
      dashrowAiring.current.scrollLeft - size.width + 200;
  };
  const showMoreHandler = () => {
    // if (margin - size.width <= maxMargin) {
    //   setMargin(maxMargin);
    // } else {
    //   setMargin((prev) => prev - size.width + 200);
    // }
    dashrowAiring.current.scrollLeft =
      dashrowAiring.current.scrollLeft + size.width - 200;
  };
  const request = async () => {
    const animeResults = await Promise.all([
      sendRequest(`${baseUrl}/schedule/friday`),
      sendRequest(`${baseUrl}/top/anime/1/upcoming`),
      sendRequest(`${baseUrl}/top/anime/1/airing`),
    ]);
    setTodayAnime(animeResults[0].friday);
    setTopUpcomingAnime(animeResults[1].top);
    setTopAiringAnime(animeResults[2].top);

    console.log(animeResults);
  };

  useEffect(() => {
    request();
  }, []);
  useEffect(() => {}, [topAiringAnime]);
  return (
    <>
      <>
        <Button onClick={showLessHandler}>
          <h1>{`<<<<<`}</h1>
        </Button>
        <button onClick={showMoreHandler}>{`>>>>>`}</button>
        <div className="dash-row" ref={dashrowAiring}>
          {topAiringAnime.length > 0 &&
            topAiringAnime.map((anime) => (
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
                  <Card.Text>{anime.start_date}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
        </div>
        <div className="dash-row" ref={dashrowUpcoming}>
          {topUpcomingAnime.length > 0 &&
            topUpcomingAnime.map((anime) => (
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
                  <Card.Text>{anime.start_date}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
        </div>
        <div className="dash-row" ref={dashrowToday}>
          {todayAnime.length > 0 &&
            todayAnime.map((anime) => (
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
                  <Card.Text>{anime.start_date}</Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            ))}
        </div>
      </>
    </>
  );
};

export default AnimeDashboardPage;
