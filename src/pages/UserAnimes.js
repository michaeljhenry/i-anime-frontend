import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import { useHttpClient } from "../hooks/http-hook";
import LoadingSpinner from "../components/Loader";
import ErrorModal from "../components/ErrorModal";

const UserAnimes = (props) => {
  const [animes, setAnimes] = useState([]);
  const [animesCopy, setAnimesCopy] = useState([]);
  const [sortType, setSortType] = useState("default");

  const id = useParams().id.substring(1);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const getAnimeLists = () => {
    if (animes.length === 0) {
      return <div className="no-users__card">No {path} animes registered.</div>;
    } else {
      if (path === "watched") {
        return watchedCount > 0 ? (
          userAnimes.map((anime) => (
            <AnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              synopsis={anime.synopsis}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))
        ) : (
          <div className="no-users__card">
            <h3>
              No <br></br>"Watched Animes" Registered
            </h3>
          </div>
        );
      }
      if (path === "toWatch") {
        return toWatchCount > 0 ? (
          userAnimes.map((anime) => (
            <AnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              synopsis={anime.synopsis}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))
        ) : (
          <div className="no-users__card">
            <h3>
              No <br></br>"ToWatch Animes" Registered
            </h3>
          </div>
        );
      }
      if (path === "watching") {
        return watchingCount > 0 ? (
          userAnimes.map((anime) => (
            <AnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              synopsis={anime.synopsis}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))
        ) : (
          <div className="no-users__card">
            <h3>
              No <br></br>"Watching Animes" Registered
            </h3>
          </div>
        );
      }
      if (path === "dropped") {
        return droppedCount > 0 ? (
          userAnimes.map((anime) => (
            <AnimeCard
              key={anime.title}
              score={anime.score}
              description={anime.description}
              aid={anime._id}
              title={anime.title}
              synopsis={anime.synopsis}
              image_url={anime.image_url}
              type={anime.type}
              creator={anime.creator}
            />
          ))
        ) : (
          <div className="no-users__card">
            <h3>
              No <br></br>"Dropped Animes" Registered
            </h3>
          </div>
        );
      }
    }
    // return animes.length > 0 ? (
    //   path === "watched" ? (
    //     watchedCount > 0 ? (
    //       userAnimes.map((anime) => (
    //         <AnimeCard
    //           key={anime.title}
    //           score={anime.score}
    //           description={anime.description}
    //           aid={anime._id}
    //           title={anime.title}
    //           synopsis={anime.synopsis}
    //           image_url={anime.image_url}
    //           type={anime.type}
    //           creator={anime.creator}
    //         />
    //       ))
    //     ) : (
    //       <div className="no-users__card">
    //         <h3>
    //           No <br></br>"Watched Animes" Registered
    //         </h3>
    //       </div>
    //     )
    //   ) : toWatchCount > 0 ? (
    //     userAnimes.map((anime) => (
    //       <AnimeCard
    //         key={anime.title}
    //         score={anime.score}
    //         description={anime.description}
    //         aid={anime._id}
    //         title={anime.title}
    //         synopsis={anime.synopsis}
    //         image_url={anime.image_url}
    //         type={anime.type}
    //         creator={anime.creator}
    //       />
    //     ))
    //   ) : (
    //     <div className="no-users__card">
    //       <h3>
    //         No <br></br>"To Watch" Animes Registered
    //       </h3>
    //     </div>
    //   )
    // ) : (
    //   <div className="no-users__card">
    //     <h3>No Animes Listed</h3>
    //   </div>
    // );
  };

  // const DUMMY_ANIME = [
  //     {
  //         title: 'Naruto',
  //         synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
  //         image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
  //         creator: 'u1',
  //         type: 'toWatch',
  //         aid: 'a1'
  //     },
  //     {
  //         title: 'Bleach',
  //         synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
  //         image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
  //         creator: 'u1',
  //         type: 'watched',
  //         aid: 'a2'
  //     },

  //     {
  //         title: 'Bleac',
  //         synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
  //         image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
  //         creator: 'u2',
  //         type: 'toWatch',
  //         aid: 'a3'
  //     },
  //     {
  //         title: 'Narut',
  //         synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
  //         image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
  //         creator: 'u2',
  //         type: 'watched',
  //         aid: 'a4'
  //     }
  // ];

  useEffect(() => {
    const getAnimes = async () => {
      try {
        const animeList = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/animes/user/${id}`
        );
        // await fetch(`http://localhost:5000/api/animes/user/${id}`, {method: 'GET', body: null, methods: {}})
        // const animeList = await animeResponse.json();
        setAnimes(animeList.animes);
        setAnimesCopy(animeList.animes.slice()); // without slice they reference the same array. changing one woould change the other. slice returns a new reference to the new array created
      } catch (err) {}
    };
    getAnimes();
  }, [id, sendRequest]);

  let location = useLocation();
  let userAnimes;
  let watchedCount;
  let toWatchCount;
  let watchingCount;
  let droppedCount;

  let path = location.pathname.split("/")[3];
  const userId = useParams().id.substring(1);

  if (animes.length > 0) {
    if (path === "watched") {
      if (sortType === "default") {
        userAnimes = animes.filter(
          (el) => el.creator === userId && el.type === "watched"
        );
      } else {
        userAnimes = animesCopy.filter(
          (el) => el.creator === userId && el.type === "watched"
        );
      }
      watchedCount = userAnimes.length;
    }
    if (path === "toWatch") {
      if (sortType === "default") {
        userAnimes = animes.filter(
          (el) => el.creator === userId && el.type === "toWatch"
        );
      } else {
        userAnimes = animesCopy.filter(
          (el) => el.creator === userId && el.type === "toWatch"
        );
      }
      toWatchCount = userAnimes.length;
      //console.log(toWatchCount);
    }
    if (path === "watching") {
      if (sortType === "default") {
        userAnimes = animes.filter(
          (el) => el.creator === userId && el.type === "watching"
        );
      } else {
        userAnimes = animesCopy.filter(
          (el) => el.creator === userId && el.type === "watching"
        );
      }
      watchingCount = userAnimes.length;
    }
    if (path === "dropped") {
      if (sortType === "default") {
        userAnimes = animes.filter(
          (el) => el.creator === userId && el.type === "dropped"
        );
      } else {
        userAnimes = animesCopy.filter(
          (el) => el.creator === userId && el.type === "dropped"
        );
      }
      droppedCount = userAnimes.length;
    }
  }

  const sortHandler = (e) => {
    setSortType(e.target.value);
    if (e.target.value === "alphabetical") {
      animesCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (e.target.value === "descending score") {
      animesCopy.sort((a, b) => b.score - a.score);
    }
    if (e.target.value === "ascending score") {
      animesCopy.sort((a, b) => a.score - b.score);
    }
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          error={error.message}
          show={!!error}
          onCancel={clearError}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <React.Fragment>
          <div className="select-sort__container">
            Sort By: <br></br>
            <select className="select-sort" onChange={sortHandler}>
              <option value="default">Order added</option>
              <option value="alphabetical">Alphabetical</option>
              <option value="ascending score">Lowest score first</option>
              <option value="descending score">Highest score first</option>
            </select>
          </div>
          <div className="user-animes__container">{getAnimeLists()}</div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserAnimes;
