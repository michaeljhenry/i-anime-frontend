import React, {useState, useEffect} from 'react';

import '../pages/Anime.css'

const AnimeForm = (props) => {
    const [chosenAnimeIndex, setChosenAnimeIndex] = useState('');
    const [chosenAnime, setChosenAnime] = useState('');
    const [description, setDescription] = useState('');
    const [state, setState] = useState({});
   
    const clickedEvent = (e) => {
        e.preventDefault();
        console.log(chosenAnime);
        console.log(description);
        setState({
            name: chosenAnime,
            description: description,
            image_url: props.animeList[chosenAnimeIndex].image_url,
            synopsis: props.animeList[chosenAnimeIndex].synopsis
        
        })
    }
    useEffect(() => {
        
        if(chosenAnimeIndex !== '') {
            setChosenAnime(props.animeList[chosenAnimeIndex].title);
            console.log(props.animeList[chosenAnimeIndex].title)
            localStorage.setItem('anime',JSON.stringify(state));
            console.log(state);

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