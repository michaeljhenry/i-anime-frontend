import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useParams} from 'react-router-dom'
import AuthContext from '../context/auth-context';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from '../components/Loader';
import ErrorModal from '../components/ErrorModal';

const EditAnimePage = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const aid = useParams().aid;
    const [animeInfo, setAnimeInfo] = useState({});
    const [description, setDescription] = useState(' ');
    const [score, setScore] = useState('');
    const [charactersRemaining, setCharactersRemaining] = useState(200);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getAnime = async () => {
            const animeData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/animes/${aid}`, 'GET', null, {Authorization: 'Bearer ' + auth.token})
            // await fetch(`http://localhost:5000/api/animes/${aid}`, {
            //     method: 'GET',
            //     body: null,
            //     headers: {Authorization: 'Bearer ' + auth.token}
            // });
            // console.log(animeData.anime);
            setAnimeInfo(animeData.anime);
            setDescription(animeData.anime.description); // description does weird things in the textarea without this line. if i change the score, the description disappears. i don't want that.
        };
        getAnime();
    }, [aid, auth.token, sendRequest]);

    
    const scoreChangeHandler = (e) => {
        e.preventDefault();
        e.persist();
        setScore(e.target.value);
    }

    const textareaChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.value.length <= 200 ) {
            setDescription(e.target.value);
            setCharactersRemaining(200 - e.target.value.length);
        }
    };
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newAnime = {
            title: animeInfo.title,
            description: description,
            synopsis: animeInfo.synopsis,
            image_url: animeInfo.image_url,
            creator: animeInfo.creator,
            type: animeInfo.type,
            score: score || animeInfo.score
        }
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/animes/patch/${aid}`, 'PATCH', JSON.stringify(newAnime), {'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token});
            history.push(`/:${auth.userId}/animes/${animeInfo.type}`);

        } catch(err) {}
        // await fetch(`http://localhost:5000/api/animes/patch/${aid}`, 
        // {
        //     method: 'PATCH',
        //     body: JSON.stringify(newAnime),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + auth.token
        //     }
        // });
    };

    return(
        <React.Fragment>
        {error && <ErrorModal error={error} show = {!!error} onCancel = {clearError} />}
        {isLoading && <LoadingSpinner/>}
        {!isLoading && 
            <div className = 'anime-form__container'>
                <div className = 'user-list__item-edit'>
                    <img src = {animeInfo.image_url} alt = 'Anime'/>   
                   <p>{animeInfo.title}</p> 
                </div>
                <div className = 'no-users__card'>
                            {animeInfo.type === 'watched' && <div>* Provide a score<br></br></div>}
                            Thoughts are optional
                            <br></br>
                </div>
        {animeInfo.type === 'watched' && <div className = 'anime-form__score' onChange = {scoreChangeHandler}>
                <p>Anime Score: </p><select defaultValue = {animeInfo.score} name = 'scores' id = 'scores'>
                    <option value = {animeInfo.score}>{animeInfo.score}</option>
                    <option value="0.0">0.0</option>
                    <option value="0.5">0.5</option>
                    <option value="1.0">1.0</option>
                    <option value="1.5">1.5</option>
                    <option value="2.0">2.0</option>
                    <option value="2.5">2.5</option>
                    <option value="3.0">3.0</option>
                    <option value="3.5">3.5</option>
                    <option value="4.0">4.0</option>
                    <option value="4.5">4.5</option>
                    <option value="5.0">5.0</option>
                    <option value="5.5">5.5</option>
                    <option value="6.0">6.0</option>
                    <option value="6.5">6.5</option>
                    <option value="7.0">7.0</option>
                    <option value="7.5">7.5</option>
                    <option value="8.0">8.0</option>
                    <option value="8.5">8.5</option>
                    <option value="9.0">9.0</option>
                    <option value="9.5">9.5</option>
                    <option value = "10.0">10.0</option>
                </select> 
            </div>
        }
            <textarea 
                onChange = {textareaChangeHandler} 
                placeholder = '200 characters to express thoughts or feelings about the anime you watched or why you want to watch it...'
                value = {description}
            />
            <div className = 'text-background'><p>Characters Remaining: {charactersRemaining}</p></div>
            <button disabled = {(animeInfo.type === 'watched' && !(score || animeInfo.score))} onClick = {onSubmitHandler}>Update</button>
            </div>
        }
        </React.Fragment>
    )
}

export default EditAnimePage;