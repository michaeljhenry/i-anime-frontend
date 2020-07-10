import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from './Backdrop';

const LoadingPage = () => {
    return ReactDOM.createPortal(
    <div className = 'loader'>
    <Backdrop colour = 'light' />
        <img className = 'loader__image' src='/images/circle-sharingan.gif' alt = 'Loading'/>
    </div>,
    document.getElementById('loader-hook'));

};

export default LoadingPage;
