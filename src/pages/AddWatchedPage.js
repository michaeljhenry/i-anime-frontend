import React, {useState, useEffect} from 'react';
import AnimeSearch from '../components/AnimeSearch';

import AnimeForm from '../components/AnimeForm';

const AddWatchedPage = (props) => {
    const [animeList, setAnimeList] = useState([]);
    let array = [];
    useEffect(() => {
        //console.log(animeList);
    }, [animeList]);

    const getInfo = (animeInfo) => {
        // try useEffect to update animeList
        
        if(animeInfo.results.length > 5) {
            for(var i = 0; i < 5; i++) {
                array.push(animeInfo.results[i]);
            }
        }
        else {
            for(var j = 0; j < animeInfo.results.length;j++) {
                array.push(animeInfo.results[j]);
                }
        }
        console.log(array);
        //setAnimeList([animeInfo.results[0], animeInfo.results[1], animeInfo.results[2]]);
        setAnimeList(array);
    
    }
    return(
        <div className = 'anime-form__container'>
            <AnimeSearch getInfo = {getInfo}/>
            <AnimeForm type = 'watched' animeList = {animeList} />
        </div>
    )
}

export default AddWatchedPage;