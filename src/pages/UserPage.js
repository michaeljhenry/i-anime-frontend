import React from "react";
import { Link, useParams } from "react-router-dom";

const UserPage = () => {
  const userId = useParams().id;

  return (
    <ul className="list-options__container">
      <li className="list-options__item">
        <Link className="list-options__fill" to={`/:${userId}/animes/watched`}>
          <div>
            <h3>Anime Watched List</h3>
          </div>
        </Link>
      </li>
      <li className="list-options__item">
        <Link className="list-options__fill" to={`/:${userId}/animes/toWatch`}>
          <div>
            <h3>Anime To Watch List</h3>
          </div>
        </Link>
      </li>
      <li className="list-options__item">
        <Link className="list-options__fill" to={`/:${userId}/animes/watching`}>
          <div>
            <h3>Anime Watching List</h3>
          </div>
        </Link>
      </li>
      <li className="list-options__item">
        <Link className="list-options__fill" to={`/:${userId}/animes/dropped`}>
          <div>
            <h3>Anime Dropped List</h3>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default UserPage;
