import React from 'react';
// import '../styles/components/Modal.css';

const LoginBox = (props) => {

    return(
        <div className = 'box-container'>
            <div className = {`login-box ${props.size}`}>
                <div className = 'box-cointainer__header'></div>
                <div className = 'box-container__motto'></div>
                <div className = 'box-container__inputs'>
                    {props.children}
                </div>
            </div>
        </div>
    )
};

export default LoginBox;