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
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getAnime = async () => {
            const animeData = await sendRequest(`http://localhost:5000/api/animes/${aid}`, 'GET', null, {Authorization: 'Bearer ' + auth.token})
            // await fetch(`http://localhost:5000/api/animes/${aid}`, {
            //     method: 'GET',
            //     body: null,
            //     headers: {Authorization: 'Bearer ' + auth.token}
            // });
            setAnimeInfo(animeData.anime);
        };
        getAnime();
    }, [aid, auth.token, sendRequest]);
    const onSubmitHandler = async () => {
        const newAnime = {
            title: animeInfo.title,
            description,
            synopsis: animeInfo.synopsis,
            image_url: animeInfo.image_url,
            creator: animeInfo.creator,
            type: animeInfo.type
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
            <textarea onChange = {(e) => setDescription(e.target.value)} defaultValue = {animeInfo.description}></textarea>
            <button onClick = {onSubmitHandler}>Update</button>
            </div>
        }
        </React.Fragment>
    )
}

export default EditAnimePage;