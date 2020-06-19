import React from 'react';
import {Link} from 'react-router-dom';

const UserCard = () => {

    return(
        <div>
            <Link to={`/u1/animes`}>User One</Link>
            <Link to={`/u2/animes`}>User Two</Link>
        </div>
    )
};

export default UserCard;