import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../context/auth-context';

import '../pages/Anime.css'

const AnimeForm = (props) => {
    const auth = useContext(AuthContext);
    const [chosenAnimeIndex, setChosenAnimeIndex] = useState('');
    const [chosenAnime, setChosenAnime] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState({});
   
    const clickedEvent = async (e) => {
        e.preventDefault();
        const data = {
            title: chosenAnime,
            description: description,
            image_url: props.animeList[chosenAnimeIndex].image_url,
            synopsis: props.animeList[chosenAnimeIndex].synopsis,
            creator: auth.userId,
            type: props.type
        }

        setState({
            title: chosenAnime,
            description: description,
            image_url: props.animeList[chosenAnimeIndex].image_url,
            synopsis: props.animeList[chosenAnimeIndex].synopsis,
            creator: auth.userId,
            type: props.type
        });
        console.log(data);
        await fetch(`http://localhost:5000/api/animes/add/${props.type}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {  
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        });
        
    }
    useEffect(() => {
        
        if(chosenAnimeIndex !== '') {
            setChosenAnime(props.animeList[chosenAnimeIndex].title);
        }

    }, [chosenAnimeIndex, props.animeList, state])
    return(
            <form onSubmit = {clickedEvent}>
            {props.animeList.length > 0 ? 
                
                    props.animeList.map((anime, index) => (
                    
                        <label key = {anime.title} htmlFor={`cb-${index}`}><input onChange = {(e) => setChosenAnimeIndex(e.target.id.split('-')[1])} name = 'anime-select' type = 'radio' id = {`cb-${index}`}/>
                            <img src = {anime.image_url} alt = 'Anime'/>   
                            {anime.title}
                            

                        </label>
                     
                
                ))
                : null}
                <textarea onChange = {(e) => setDescription(e.target.value)}placeholder = 'Description in 500 words'></textarea>
                <button disabled = {!chosenAnimeIndex}type = 'submit'>Add Anime</button>
            </form>
      
    )
}

export default AnimeForm;