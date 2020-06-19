import React from 'react';

const AnimeCard = (props) => {
    console.log(props.title);
    return(
        <div key = {props.title}>
            <img src = {props.image_url} alt = {`${props.title} `}/>
            <p>{props.title}</p>
            {props.synopsis}
            <button>Edit</button>
            <button>Delete</button>
            
        </div>
    )
}

export default AnimeCard;