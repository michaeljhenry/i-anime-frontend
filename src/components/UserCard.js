import React from 'react';
import {Link} from 'react-router-dom';

const UserCard = (props) => {

    return(
            <Link to={`/${props.id}/animes`}>
            <div className = 'card-container'>
                <div className = 'card-header'>
                    <div>
                        <img className = 'image-upload__icon' src = {`${process.env.REACT_APP_IMAGE_URL}/${props.image}`} alt = {`not working`}/>
                    </div>
                    <h3>{props.name}</h3>
                </div>
                <div className = 'card-footer'>
                    Animes Listed: {props.animes.length}
                </div>
            </div>
            </Link>
    )
};

export default UserCard;