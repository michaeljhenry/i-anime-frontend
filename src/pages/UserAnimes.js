import React, { useState, useEffect} from 'react';
import {useParams, useLocation} from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from '../components/Loader';
import ErrorModal from '../components/ErrorModal';

const UserAnimes = (props) => {
    const [animes, setAnimes] = useState([]);
    const id = useParams().id.substring(1);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    // const DUMMY_ANIME = [
    //     {
    //         title: 'Naruto',
    //         synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
    //         image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
    //         creator: 'u1',
    //         type: 'toWatch',
    //         aid: 'a1'
    //     },
    //     {
    //         title: 'Bleach',
    //         synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
    //         image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
    //         creator: 'u1',
    //         type: 'watched',
    //         aid: 'a2'
    //     },
        
    //     { 
    //         title: 'Bleac',
    //         synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
    //         image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
    //         creator: 'u2',
    //         type: 'toWatch',
    //         aid: 'a3'
    //     },
    //     {
    //         title: 'Narut',
    //         synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
    //         image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
    //         creator: 'u2',
    //         type: 'watched',
    //         aid: 'a4'
    //     }
    // ];

    useEffect(() => {
        const getAnimes = async () => {
            try {
                const animeList = await sendRequest(`http://localhost:5000/api/animes/user/${id}`);
                // await fetch(`http://localhost:5000/api/animes/user/${id}`, {method: 'GET', body: null, methods: {}})
                // const animeList = await animeResponse.json();
                setAnimes(animeList.animes);
            } catch(err) {}
        }
        getAnimes();
    }, [id, sendRequest]);
    
    let location = useLocation();
    let userAnimes;
    let watchedCount;
    let toWatchCount;
    let path = location.pathname.split('/')[3];
    const userId = useParams().id.substring(1);
    
    //console.log(animes);
    if(animes.length > 0) {
        if(path === 'watched') {
            userAnimes = animes.filter((el) => (el.creator === userId && el.type === 'watched'));
            console.log('hi');
            console.log(userAnimes);
            watchedCount = userAnimes.length;
            console.log(watchedCount);
        }
        else if(path === 'toWatch') {
            userAnimes = animes.filter((el) => el.creator === userId && el.type === 'toWatch');
            toWatchCount = userAnimes.length;
            console.log(toWatchCount);
        }
    }
    
    return(
        <React.Fragment>
            {error && <ErrorModal error={error.message} show = {!!error} onCancel = {clearError} />}
            {isLoading && <LoadingSpinner/>}
            {!isLoading && 
                <div className = 'user-animes__container'>
                
                {animes.length > 0 ? 
                    (path === 'watched' ? 
                        (watchedCount > 0 ? (userAnimes.map((anime) => (
                            <AnimeCard key = {anime.title} score = {anime.score} description = {anime.description} aid = {anime._id} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} type = {anime.type} creator = {anime.creator}/>
                        ))) : <div className = 'no-users__card'>
                                <h3>No <br></br>"Watched Animes" Registered</h3>
                            </div>) 
                    : 
                    toWatchCount > 0 ? 
                        userAnimes.map((anime) => (
                            <AnimeCard key = {anime.title} score = {anime.score} description = {anime.description} aid = {anime._id} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} type = {anime.type} creator = {anime.creator} />
                        ))
                        : 
                        <div className = 'no-users__card'>
                            <h3>No <br></br>"To Watch" Animes Registered</h3>
                        </div>)
                : 
                <div className = 'no-users__card'><h3>No Animes Listed</h3></div>
                }
                </div>
            }
        </React.Fragment>
    )
}

export default UserAnimes;