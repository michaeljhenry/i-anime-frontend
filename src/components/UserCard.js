import React from 'react';
import {Link} from 'react-router-dom';

const UserCard = (props) => {

    return(
        <div>
                <Link to={`/${props.id}/animes`}>{props.name}<img src = {`http://localhost:5000/${props.image}`} alt = {`not working`}/></Link>
        </div>
    )
};

export default UserCard;