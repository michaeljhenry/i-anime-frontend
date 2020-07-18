import React, {useContext} from 'react';
import {Link, useParams, useHistory} from 'react-router-dom';
import AuthContext from '../context/auth-context';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from './Loader';
import ErrorModal from './ErrorModal';

const AnimeCard = (props) => {
    const user = useParams().id.substring(1);
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    let history = useHistory();

    const onDeleteHandler = async () => {
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/animes/delete/${props.aid}`, 'DELETE', null, {'Authorization': 'Bearer ' + auth.token});
            // await fetch(`http://localhost:5000/api/animes/delete/${props.aid}`, {
            //     method: 'DELETE',
            //     body: null,
            //     headers: {'Authorization': 'Bearer ' + auth.token}
            // });
            history.push(`/${auth.userId}/animes`);

        } catch(err) {}
    }
    const onSwitchTypeHandler = async () => {
        try {
        await sendRequest(process.env.REACT_APP_BACKEND_URL + `/animes/patch/type/${props.aid}`, 'PATCH', {creator: props.creator, type: props.type}, {'Authorization': 'Bearer ' + auth.token});
            history.push(`/${auth.userId}/animes`);
        } catch(err) {}
    }
    return(
        <React.Fragment>
        {error && <ErrorModal error={error} show = {!!error} onCancel = {clearError} />}
        {isLoading && <LoadingSpinner/>}
        {!isLoading && 
            <div className = 'user-list__item' key = {props.title}>
                <img src = {props.image_url} alt = {`${props.title} `}/>
                <p>{props.title}</p>
                <div className = 'user-list__item-description'>
                    <p>{props.description}</p>
                </div>
                <div>
                {props.type === 'watched' && <p style = {{fontWeight: 'bold'}}>{props.score ? `User Rating: ${props.score}` : `No User Rating`}</p>}

                </div>
                {user === auth.userId ? (
                        <div className = 'edit-buttons'>
                            <Link to ={`/anime/edit/${props.aid}`}>
                                <button className = 'edit-btn'>Edit</button>
                            </Link>
                            <button className = 'delete-btn' onClick = {onDeleteHandler}>Delete</button>
                            {props.type === 'toWatch' && <button className = 'switch-type__btn' onClick = {onSwitchTypeHandler}>Now Watched</button>}
                        </div>
                    ) 
                    : 
                    null
                }
            </div>
        }
        </React.Fragment>
    )
}

export default AnimeCard;