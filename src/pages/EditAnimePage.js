import React, {useContext, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom'
import AnimeForm from '../components/AnimeForm';
import AuthContext from '../context/auth-context';

const EditAnimePage = () => {
    const auth = useContext(AuthContext);
    const aid = useParams().aid;
    const [animeInfo, setAnimeInfo] = useState({});
    const [description, setDescription] = useState('');
    useEffect(() => {
        const getAnime = async () => {
            const anime = await fetch(`http://localhost:5000/api/animes/${aid}`, {
                method: 'GET',
                body: null,
                headers: {Authorization: 'Bearer ' + auth.token}
            });
            const animeData = await anime.json();
            setAnimeInfo(animeData.anime);
        };
        getAnime();
    }, []);
    const onSubmitHandler = async () => {
        const newAnime = {
            title: animeInfo.title,
            description,
            synopsis: animeInfo.synopsis,
            image_url: animeInfo.image_url,
            creator: animeInfo.creator,
            type: animeInfo.type
        }
        await fetch(`http://localhost:5000/api/animes/patch/${aid}`, 
        {
            method: 'PATCH',
            body: JSON.stringify(newAnime),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        });
    };

    return(
        <div>
        <label key = {animeInfo.title} htmlFor={`cb`}><input name = 'anime-select' type = 'radio' id = {`cb`}/>
        <img src = {animeInfo.image_url} alt = 'Anime'/>   
        {animeInfo.title}
        
        <textarea onChange = {(e) => setDescription(e.target.value)} defaultValue = {animeInfo.description}></textarea>
        <button onClick = {onSubmitHandler}>Submit</button>
        </label>
        </div>
    )
}

export default EditAnimePage;