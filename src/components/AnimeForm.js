import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/auth-context';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from '../components/Loader';
import '../pages/Anime.css'
import {useHistory} from 'react-router-dom';
import ErrorModal from './ErrorModal';

const AnimeForm = (props) => {
    const auth = useContext(AuthContext);
    const [chosenAnimeIndex, setChosenAnimeIndex] = useState('');
    const [chosenAnime, setChosenAnime] = useState('');
    const [description, setDescription] = useState(''); 
    const [state, setState] = useState({});
    const [charactersRemaining, setCharactersRemaining] = useState(100);
    const [score, setScore] = useState('');
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const history = useHistory();

    const scoreChangeHandler = (e) => {
        setScore(e.target.value);
    }
    const textareaChangeHandler = (e) => {
        if (e.target.value.length <= 100 ) {
            setDescription(e.target.value);
            setCharactersRemaining(100 - e.target.value.length);
        }
    };
    const clickedEvent = async (e) => {
        e.preventDefault();
        const data = {
            title: chosenAnime,
            description: description,
            image_url: props.animeList[chosenAnimeIndex].image_url,
            synopsis: props.animeList[chosenAnimeIndex].synopsis,
            score: score,
            creator: auth.userId,
            type: props.type,
        }

        setState({
            title: chosenAnime,
            description: description,
            image_url: props.animeList[chosenAnimeIndex].image_url,
            synopsis: props.animeList[chosenAnimeIndex].synopsis,
            score: score,
            creator: auth.userId,
            type: props.type
        });
        console.log(data);
        try {
            await sendRequest(process.env.REACT_APP_BACKEND_URL + `/animes/add/${props.type}`, 'POST', JSON.stringify(data), {'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token});
            // await fetch(`http://localhost:5000/api/animes/add/${props.type}`, {
            //     method: 'POST',
            //     body: JSON.stringify(data),
            //     headers: {  
            //         'Content-Type': 'application/json',
            //         Authorization: 'Bearer ' + auth.token
            //     }
            // });
            history.push('/');
        } catch(err) {}
    }
    useEffect(() => {
        console.log(chosenAnimeIndex);
        if(chosenAnimeIndex !== '') {
            setChosenAnime(props.animeList[chosenAnimeIndex].title);
        }

    }, [chosenAnimeIndex, props.animeList, state])
    return(
        <React.Fragment>
        {error && <ErrorModal error={error} show = {!!error} onCancel = {clearError} />}
        {isLoading && <LoadingSpinner/>}
        {!isLoading && 
            <form onSubmit = {clickedEvent}>
                <div className = 'anime-form__info'> 
                    {props.animeList.length > 0 ?
                        <React.Fragment>
                        <div className = 'no-users__card'>
                            * Select an anime
                            <br></br>
                            {props.type === 'watched' && <div>* Provide a score<br></br></div>}
                            Thoughts are optional
                            <br></br>
                        </div>
                        <div className = 'ordering-things-two'>
                            {props.animeList.map((anime, index) => (
                            <React.Fragment key = {anime.title}>

                            <div  className = 'anime-search__card'>
                                <input 
                                    onChange = {(e) => setChosenAnimeIndex(e.target.id.split('-')[1])} 
                                    name = 'anime-select' type = 'radio' id = {`cb-${index}`}
                                />
                                <div className = 'fill-up'>
                                    <label htmlFor={`cb-${index}`}>
                                    <div className = 'anime-search__label'>
                                        <img className = 'anime-form__image' src = {anime.image_url} alt = 'Anime'/>   
                                        <p>{anime.title}</p>
                                        <div className = 'anime-search__synopsis'>{anime.synopsis}</div>
                                        <p>Score: {anime.score}</p>
                                    </div>
                                    </label>
                                </div>
                            </div>
                            </React.Fragment>
                            
                    ))} 
                    </div>
                    </React.Fragment> 
                    : null}
                </div>
                {props.type === 'watched' && <div className = 'anime-form__score' onChange = {scoreChangeHandler}>
                    <p>Anime Score: </p><select name = 'scores' id = 'scores'>
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
                <textarea onChange = {textareaChangeHandler} placeholder = '100 characters to express thoughts or feelings about the anime you watched or why you want to watch it...' value = {description}></textarea>
                <div className = 'text-background'><p>Characters Remaining: {charactersRemaining}</p></div>
                
                {props.type === 'watched' ? <button onClick = {clickedEvent} disabled = {!(chosenAnimeIndex && score)} type = 'submit'><h3>Add Anime</h3></button>
                :
                <button onClick = {clickedEvent} disabled = {!(chosenAnimeIndex)} type = 'submit'><h3>Add Anime</h3></button>
                }
            </form>
                        }
            </React.Fragment>
      
    )
}

export default AnimeForm;