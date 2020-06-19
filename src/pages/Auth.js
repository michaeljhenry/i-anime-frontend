import React, {useContext, useState, useEffect, useReducer} from 'react';
import validate from '../reducers/validate';
import {withRouter} from 'react-router-dom';
import AuthContext from '../context/auth-context';

const initialState = {
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false
}
const Auth = (props) => {

    const auth = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [authMode, setAuthMode] = useState(true);
    
    const [isNameActive, setIsNameActive] = useState(true);
    const [isEmailActive, setIsEmailActive] = useState(true);
    const [isPasswordActive, setIsPasswordActive] = useState(true);

    useEffect(() => {

    }, [submitAttempt]);


    const [state, dispatch] = useReducer(validate, initialState);

    const authHandler = async (e) => {
        e.persist();
        e.preventDefault();
        const userData = {
            name,
            email,
            password
        }
        const response = await fetch(`http://localhost:5000/api/users/signup`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {'Content-Type': 'application/json'}
        });
        auth.login();
        props.history.push('/')
        //console.log(`Submit attempt? ${submitAttempt}`);
    }
    const nameChangeHandler = (e) => {
        e.preventDefault();
        setName(e.target.value);
        dispatch({type: 'CHANGE_NAME', val: e.target.value})
    }
    const emailChangeHandler = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
        dispatch({type: 'CHANGE_EMAIL', val: e.target.value})      
    }
    const passwordChangeHandler = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
        dispatch({type: 'CHANGE_PASSWORD', val: e.target.value})
    }
    const onNameBlurHandler = () => {
        setIsNameActive(false);
    }
    const onEmailBlurHandler = () => {
        if(email.length > 0) {
            setIsEmailActive(false);
        }
    }
    const onPasswordBlurHandler = () => {
        if(password.length > 0) {
            setIsPasswordActive(false);
        }
    }
    const switchModeHandler = () => {
        
        setAuthMode(!authMode);
    }

    return(
        <div>
        {authMode === true ?
            <div>
            <form onSubmit = {authHandler}>
                    Email <input onBlur = {onEmailBlurHandler} onChange = {emailChangeHandler} type = 'text'></input> {isEmailActive ? '' : (state.isEmailValid ? '' : 'Please enter a valid email')}
                    Password <input onBlur = {onPasswordBlurHandler} onChange = {passwordChangeHandler} type = 'text'></input> {isPasswordActive ? '' : (state.isPasswordValid ? '' : 'Please enter a password with a minimum of 6 characters')}
                <button disabled = {!(state.isNameValid && state.isEmailValid && state.isPasswordValid)}type = 'submit'>Login</button>
            </form>
            <button onClick = {switchModeHandler}>Switch to signup</button>
            </div>
        :
        <div>
        <form onSubmit = {authHandler}>
            Name <input onBlur = {onNameBlurHandler} onChange = {nameChangeHandler} type = 'text'></input>  {isNameActive ? '' : (state.isNameValid ? '' : 'Please enter a name')}
            Email <input onBlur = {onEmailBlurHandler} onChange = {emailChangeHandler} type = 'text'></input> {isEmailActive ? '' : (state.isEmailValid ? '' : 'Please enter a valid email')}
            Password <input onBlur = {onPasswordBlurHandler} onChange = {passwordChangeHandler} type = 'text'></input> {isPasswordActive ? '' : (state.isPasswordValid ? '' : 'Please enter a password with a minimum of 6 characters')}
            <button disabled = {!(state.isNameValid && state.isEmailValid && state.isPasswordValid)}type = 'submit'>Login</button>
        </form>
        <button onClick = {switchModeHandler}>Switch to login</button>
        </div>
    }
       </div>
    )
};

export default withRouter(Auth);