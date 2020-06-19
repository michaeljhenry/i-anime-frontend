import React from 'react';
import {useParams, useLocation} from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';

const UserAnimes = (props) => {
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
    let location = useLocation();
    let userAnimes;
    console.log(location.pathname);
    let path = location.pathname.split('/')[3];
    console.log(path);
    const userId = useParams().id.substring(1);
    
    
    if(path === 'watched') {
        userAnimes = DUMMY_ANIME.filter((el) => (el.creator === userId && el.type === 'watched'));
    }
    else if(path === 'toWatch') {
        userAnimes = DUMMY_ANIME.filter((el) => el.creator === userId && el.type === 'toWatch');
    }
    
    return(

        <div>
        {path === 'watched' ? userAnimes.map((anime) => (
            <AnimeCard key = {anime.title} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} />
        )) : userAnimes.map((anime) => (
            <AnimeCard key = {anime.title} title = {anime.title} synopsis = {anime.synopsis} image_url = {anime.image_url} />
        ))
        }
        </div>
    )
}

export default UserAnimes;