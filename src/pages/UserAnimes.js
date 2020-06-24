import React, { useState, useEffect } from 'react';
import {useParams, useLocation} from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';

const UserAnimes = (props) => {
    const [animes, setAnimes] = useState([]);
    const id = useParams().id.substring(1);
    const DUMMY_ANIME = [
        {
            title: 'Naruto',
            synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
            image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
            creator: 'u1',
            type: 'toWatch',
            aid: 'a1'
        },
        {
            title: 'Bleach',
            synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
            image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
            creator: 'u1',
            type: 'watched',
            aid: 'a2'
        },
        
        { 
            title: 'Bleac',
            synopsis: 'Ichigo Kurosaki is an ordinary high schooler—until his family is attacked by a Hollow, a corrup',
            image_url:"https://cdn.myanimelist.net/images/anime/3/40451.jpg?s=3aa217eced217b3b4223af21c30fe2ed",
            creator: 'u2',
            type: 'toWatch',
            aid: 'a3'
        },
        {
            title: 'Narut',
            synopsis: `Moments prior to Naruto Uzumaki's birth, a huge demon known as the Kyuubi, the Nine-Tailed Fox`,
            image_url: "https://cdn.myanimelist.net/images/anime/13/17405.jpg?s=59241469eb470604a792add6fbe7cce6",
            creator: 'u2',
            type: 'watched',
            aid: 'a4'
        }
    ];

    useEffect(() => {
        const getAnimes = async () => {
            const animeResponse = await fetch(`http://localhost:5000/api/animes/user/${id}`, {method: 'GET', body: null, methods: {}})
            const animeList = await animeResponse.json();
            setAnimes(animeList.animes);
        }
        getAnimes();
    }, [id])
    let location = useLocation();
    let userAnimes;
    let path = location.pathname.split('/')[3];
    const userId = useParams().id.substring(1);
    
    console.log(animes);
    if(animes.length > 0) {
        if(path === 'watched') {
            userAnimes = animes.filter((el) => (el.creator === userId && el.type === 'watched'));
        }
        else if(path === 'toWatch') {
            userAnimes = animes.filter((el) => el.creator === userId && el.type === 'toWatch');
        }
    }
    
    return(

        <div>
        {animes.length > 0 ? (path === 'watched' ? userAnimes.map((anime) => (
            <AnimeCard key = {anime.title} aid = {anime._id} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} />
        )) : userAnimes.map((anime) => (
            <AnimeCard key = {anime.title} aid = {anime._id} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} />
        )))
        : null
        }
        </div>
    )
}

export default UserAnimes;