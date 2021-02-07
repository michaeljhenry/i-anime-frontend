import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Row, Image } from "react-bootstrap";
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
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const dayNum = new Date().getDay();
  const day = days[dayNum];
  console.log(days[dayNum]);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const showLessHandler = (e) => {
    if (e.target.id === "airing") {
      dashrowAiring.current.scrollLeft =
        dashrowAiring.current.scrollLeft - size.width + 200;
    } else if (e.target.id === "upcoming") {
      dashrowUpcoming.current.scrollLeft =
        dashrowUpcoming.current.scrollLeft - size.width + 200;
    } else {
      dashrowToday.current.scrollLeft =
        dashrowToday.current.scrollLeft - size.width + 200;
    }
  };
  const showMoreHandler = (e) => {
    if (e.target.id === "airing") {
      dashrowAiring.current.scrollLeft =
        dashrowAiring.current.scrollLeft + size.width - 200;
    } else if (e.target.id === "upcoming") {
      dashrowUpcoming.current.scrollLeft =
        dashrowUpcoming.current.scrollLeft + size.width - 200;
    } else {
      dashrowToday.current.scrollLeft =
        dashrowToday.current.scrollLeft + size.width - 200;
    }
  };
  const request = useCallback(async () => {
    const animeResults = await Promise.all([
      sendRequest(`${baseUrl}/schedule/${days[(dayNum + 1) % 7]}`), // API is lagging by a day. code adjusts for that.
      sendRequest(`${baseUrl}/top/anime/1/upcoming`),
      sendRequest(`${baseUrl}/top/anime/1/airing`),
    ]);
    if (day === "sunday") {
      setTodayAnime(animeResults[0].monday);
    } else if (day === "monday") {
      setTodayAnime(animeResults[0].tuesday);
    } else if (day === "tuesday") {
      setTodayAnime(animeResults[0].wednesday);
    } else if (day === "wednesday") {
      setTodayAnime(animeResults[0].thursday);
    } else if (day === "thursday") {
      setTodayAnime(animeResults[0].friday);
    } else if (day === "friday") {
      setTodayAnime(animeResults[0].saturday);
    } else {
      setTodayAnime(animeResults[0].sunday);
    }
    setTopUpcomingAnime(animeResults[1].top);
    setTopAiringAnime(animeResults[2].top);

    console.log(animeResults);
  }, [sendRequest]);

  useEffect(() => {
    request();
  }, []);
  useEffect(() => {
    console.log(todayAnime);
  }, [todayAnime]);
  return (
    <>
      <>
        {todayAnime.length > 0 && (
          <Row className="anime-dash__main">
            <Row className="anime-dash__main-content">
              <Row className="anime-dash__main-text__container">
                <h1 id="anime-dash__main-title">Shingeki no Kyojin</h1>
                <span className="anime-dash__main-text">
                  Centuries ago, mankind was slaughtered to near extinction by
                  monstrous humanoid creatures called titans, forcing humans to
                  hide in fear behind enormous concentric walls. What makes
                  these giants truly terrifying is that their taste for human
                  flesh is not born out of hunger but what appears to be out of
                  pleasure. To ensure their survival, the remnants of humanity
                  began living within defensive barriers, resulting in one
                  hundred years without a single titan encounter. However, that
                  fragile calm is soon shattered when a colossal titan manages
                  to breach the supposedly impregnable outer wall, reigniting
                  the fight for survival against the man-eating abominations.
                  After witnessing a horrific personal loss at the hands of the
                  invading creatures, Eren Yeager dedicates his life to their
                  eradication by enlisting into the Survey Corps, an elite
                  military unit that combats the merciless humanoids outside the
                  protection of the walls. Based on Hajime Isayama's
                  award-winning manga, Shingeki no Kyojin follows Eren, along
                  with his adopted sister Mikasa Ackerman and his childhood
                  friend Armin Arlert, as they join the brutal war against the
                  titans and race to discover a way of defeating them before the
                  last walls are breached.
                </span>
              </Row>
            </Row>
          </Row>
        )}
        <Row className="separator-row">
          <h1>Airing Anime</h1>
          <hr className="separator"></hr>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showLessHandler}
          >
            <h1 id="airing">{`<`}</h1>
          </Button>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showMoreHandler}
          >
            <h1 id="airing">{`>`}</h1>
          </Button>
        </Row>
        <Row className="dash-row" ref={dashrowAiring}>
          {topAiringAnime.length > 0 &&
            topAiringAnime.map((anime) => (
              <Link key={anime.title}>
                <Card className="anime-card">
                  <Card.Img
                    className="anime-card__image"
                    variant="top"
                    src={`${anime.image_url}`}
                  />
                  <Card.Body className="anime-card__content">
                    <Card.Title className="anime-card__content-title">
                      {anime.title}
                    </Card.Title>
                    <Button className="anime-card__btn" variant="primary">
                      SEE DETAILS
                    </Button>
                    <div className="anime-card__footer">
                      <Card.Text>{anime.type}</Card.Text>
                      {anime.start_date && (
                        <Card.Text>{anime.start_date}</Card.Text>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        </Row>
        <Row className="separator-row">
          <h1>Upcoming Anime</h1>
          <hr className="separator"></hr>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showLessHandler}
          >
            <h1 id="upcoming">{`<`}</h1>
          </Button>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showMoreHandler}
          >
            <h1 id="upcoming">{`>`}</h1>
          </Button>
        </Row>
        <Row className="dash-row" ref={dashrowUpcoming}>
          {topUpcomingAnime.length > 0 &&
            topUpcomingAnime.map((anime) => (
              <Link key={anime.title}>
                <Card className="anime-card">
                  <Card.Img
                    className="anime-card__image"
                    variant="top"
                    src={`${anime.image_url}`}
                  />
                  <Card.Body className="anime-card__content">
                    <Card.Title className="anime-card__content-title">
                      {anime.title}
                    </Card.Title>
                    <Button className="anime-card__btn" variant="primary">
                      SEE DETAILS
                    </Button>
                    <div className="anime-card__footer">
                      <Card.Text>{anime.type}</Card.Text>
                      {anime.start_date && (
                        <Card.Text>{anime.start_date}</Card.Text>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        </Row>
        <Row className="separator-row">
          <h1 id="today">Airing Today</h1>
          <hr className="separator"></hr>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showLessHandler}
          >
            <h1>{`<`}</h1>
          </Button>
          <Button
            variant="dark"
            className="scroll-btn"
            onClick={showMoreHandler}
          >
            <h1>{`>`}</h1>
          </Button>
        </Row>
        <Row className="dash-row" ref={dashrowToday}>
          {todayAnime.length > 0 &&
            todayAnime.map((anime) => (
              <Link key={anime.title}>
                <Card className="anime-card">
                  <Card.Img
                    className="anime-card__image"
                    variant="top"
                    src={`${anime.image_url}`}
                  />
                  <Card.Body className="anime-card__content">
                    <Card.Title className="anime-card__content-title">
                      {anime.title}
                    </Card.Title>
                    <Button className="anime-card__btn" variant="primary">
                      SEE DETAILS
                    </Button>
                    <div className="anime-card__footer">
                      <Card.Text>{anime.type}</Card.Text>
                      {anime.start_date && (
                        <Card.Text>{anime.start_date}</Card.Text>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        </Row>
      </>
    </>
  );
};

export default AnimeDashboardPage;
