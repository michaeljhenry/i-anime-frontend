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
    const [description, setDescription] = useState('');
    const [score, setScore] = useState('');

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getAnime = async () => {
            const animeData = await sendRequest(`http://localhost:5000/api/animes/${aid}`, 'GET', null, {Authorization: 'Bearer ' + auth.token})
            // await fetch(`http://localhost:5000/api/animes/${aid}`, {
            //     method: 'GET',
            //     body: null,
            //     headers: {Authorization: 'Bearer ' + auth.token}
            // });
            console.log(animeData.anime);
            setAnimeInfo(animeData.anime);
        };
        getAnime();
    }, [aid, auth.token, sendRequest]);

    
    const scoreChangeHandler = (e) => {
        setScore(e.target.value);
    }


    const onSubmitHandler = async () => {
        const newAnime = {
            title: animeInfo.title,
            description,
            synopsis: animeInfo.synopsis,
            image_url: animeInfo.image_url,
            creator: animeInfo.creator,
            type: animeInfo.type,
            score: score
        }
        try {
            await sendRequest(`http://localhost:5000/api/animes/patch/${aid}`, 'PATCH', JSON.stringify(newAnime), {'Content-Type': 'application/json', Authorization: 'Bearer ' + auth.token});
            history.push('/');
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
        {error && <ErrorModal error={error.message} show = {!!error} onCancel = {clearError} />}
        {isLoading && <LoadingSpinner/>}
        {!isLoading && 
            <div className = 'anime-form__container'>
                <div className = 'user-list__item-edit'>
                    <img src = {animeInfo.image_url} alt = 'Anime'/>   
                    {animeInfo.title}
                </div>
        ]<div className = 'anime-form__score' onChange = {scoreChangeHandler}>
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
            <textarea onChange = {(e) => setDescription(e.target.value)} defaultValue = {animeInfo.description}></textarea>
            <button onClick = {onSubmitHandler}>Update</button>
            </div>
        }
        </React.Fragment>
    )
}

export default EditAnimePage;