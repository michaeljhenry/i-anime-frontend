import React, {useContext} from 'react';
import AuthContext from '../context/auth-context';
import {NavLink} from 'react-router-dom';

const NavLinks = () => {
    const auth = useContext(AuthContext);
    return (
        <nav>
            <NavLink exact = {true} to='/'>Home</NavLink>
            <NavLink to='/anime/add/watched'>Add Watched Anime</NavLink>
            <NavLink to='/anime/add/toWatch'>Add To-Watch Anime</NavLink>
            <NavLink to={`/${auth.userId}/animes`}>My Anime</NavLink>
        </nav>
    )
};

export default NavLinks;