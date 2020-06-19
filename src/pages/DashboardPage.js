import React from 'react';
import UserCard from '../components/UserCard';
const DashboardPage = () => {
    const anime = localStorage.getItem('anime');
    //console.log(anime);
    return(
        <div><UserCard/></div>
    )
}

export default DashboardPage