import React from 'react';
import {Link, useParams} from 'react-router-dom';

const UserPage = () => {
    const userId = useParams().id;
   
    return(
        <div>
            <Link to = {`/:${userId}/animes/watched`}>Watched Anime</Link>
            <Link to = {`/:${userId}/animes/toWatch`}>To Watch</Link>
        </div>
    )
}

export default UserPage;