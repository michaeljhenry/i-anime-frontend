import React, {useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import AuthContext from '../context/auth-context';

const AnimeCard = (props) => {
    const user = useParams().id.substring(1);
    const auth = useContext(AuthContext);
    let history = useHistory();

    const onDeleteHandler = async () => {
        await fetch(`http://localhost:5000/api/animes/delete/${props.aid}`, {
            method: 'DELETE',
            body: null,
            headers: {'Authorization': 'Bearer ' + auth.token}
        });
        history.push('/');
    }
    return(
        <div key = {props.title}>
            <img src = {props.image_url} alt = {`${props.title} `}/>
            <p>{props.title}</p>
            {props.synopsis}
            {user === auth.userId ? (<div><Link to ={`/anime/edit/${props.aid}`}><button>Edit</button></Link>
            <button onClick = {onDeleteHandler}>Delete</button></div>) : null}
            
        </div>
    )
}

export default AnimeCard;