import React, {useContext, useState} from 'react';
import AuthContext from '../context/auth-context';
import NameContext from '../context/name-context';
import {NavLink} from 'react-router-dom';
import SideDrawer from './SideDrawer';
import Backdrop from './Backdrop';


const NavLinks = (props) => {
    const auth = useContext(AuthContext);
    const nameContext = useContext(NameContext);
    const [sideDrawer, setSideDrawer] = useState(false);

    let navs;
    let sideDrawerMainNavs;
    let sideDrawerInnerNavs;

    const openDrawer = () => {

        setSideDrawer(true);
    };
    const closeDrawer = (e) => {
        //e.preventDefault();
        nameContext.setNameFunction('');
        setSideDrawer(false);
        
    };

    if(auth.isLoggedIn) {
        navs = (
            <React.Fragment>
                <ul className = 'nav-links'>
                    <li><NavLink onClick = {(e) => {nameContext.setNameFunction('');}} activeClassName = 'is-active' exact = {true} to='/'>I-Anime</NavLink></li>
                    <li><NavLink activeClassName = 'is-active' to='/anime/add/watched'>Add Watched</NavLink></li>
                    <li><NavLink activeClassName = 'is-active' to='/anime/add/toWatch'>Add To-Watch</NavLink></li>
                    <li><NavLink activeClassName = 'is-active' to={`/${auth.userId}/animes`}>My Anime</NavLink></li>
                </ul>

        </React.Fragment>
        )
        sideDrawerMainNavs = (
            <ul className = 'mobile-main__links'>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' exact = {true} to={`/`}>I-Anime</NavLink></li>
            </ul>
        )
        sideDrawerInnerNavs = (
            <ul className = 'nav-links__sidebar'>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' exact = {true} to='/'>I-Anime</NavLink></li>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' to='/anime/add/watched'>Add Watched</NavLink></li>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' to='/anime/add/toWatch'>Add To-Watch</NavLink></li>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' to={`/${auth.userId}/animes`}>My Anime</NavLink></li>
                {auth.token ? <button className = 'logout-btn' onClick = {auth.logout}>Logout</button> : ''}

            </ul>
        )
    }
    else {
        navs = (
            <React.Fragment>
                <ul className = 'nav-links'>
                    <li><NavLink onClick = {(e) => {nameContext.setNameFunction('');}} activeClassName = 'is-active' exact = {true} to={`/`}>I-Anime</NavLink></li>
                    <li><NavLink activeClassName = 'is-active' to={`/auth`}>Login/Signup</NavLink></li>

                </ul>
            </React.Fragment>
        )
        sideDrawerMainNavs = (
            <ul className = 'mobile-main__links'>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' exact = {true} to={`/`}>I-Anime</NavLink></li>
            </ul>
        )
        sideDrawerInnerNavs = (
            <ul className = 'nav-links__sidebar'>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active' exact = {true} to={`/`}>I-Anime</NavLink></li>
                <li><NavLink onClick = {closeDrawer} activeClassName = 'is-active'to={`/auth`}>Login/Signup</NavLink></li>
                <div className = 'move-button'>{auth.token ? <button className = 'logout-btn' onClick = {auth.logout}>Logout</button> : ''}</div>

            </ul>
        )
    }
    return (
        <React.Fragment>
            {sideDrawer && <React.Fragment><Backdrop colour = 'dark' onClick = {closeDrawer}/>
                <SideDrawer show = {sideDrawer}>
                <nav className = 'sidebar-nav'>
                    {sideDrawerInnerNavs}
                </nav>
                </SideDrawer>
                </React.Fragment>
            }
            {!sideDrawer && <React.Fragment>
                <button className = 'side-drawer__btn' onClick = {openDrawer}>
                    <div className = 'btn-line'></div>
                    <div className = 'btn-line'></div>
                    <div className = 'btn-line'></div>
                </button>
                
                    {sideDrawerMainNavs}
                    {navs}
                    {sideDrawer && <SideDrawer show = {sideDrawer}>{navs}</SideDrawer>}
            </React.Fragment>
            }
            
            
        </React.Fragment>
    )
};

export default NavLinks;