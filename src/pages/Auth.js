import React, {useContext, useState, useEffect, useReducer} from 'react';
import validate from '../reducers/validate';
import {withRouter} from 'react-router-dom';
import AuthContext from '../context/auth-context';
import ImageUpload from '../components/ImageUpload';

const initialState = {
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false
}
const Auth = (props) => {

    const auth = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    const [submitAttempt, setSubmitAttempt] = useState(false);
    const [authMode, setAuthMode] = useState(true);
    
    const [isNameActive, setIsNameActive] = useState(true);
    const [isEmailActive, setIsEmailActive] = useState(true);
    const [isPasswordActive, setIsPasswordActive] = useState(true);

    useEffect(() => {

    }, [submitAttempt]);


    const [state, dispatch] = useReducer(validate, initialState);

    const onImageUpload = (data) => {
        const imagePicked = [data];
        setImage(imagePicked[0]);
    }
    const authHandler = async (e) => {
        e.persist();
        e.preventDefault();
        let userData;
        if(!authMode) {
            const userInfo = new FormData();
            userInfo.append('name', name);
            userInfo.append('image', image);
            userInfo.append('email', email); // this is the key fileUpload.single('image') is looking for in our backend
            userInfo.append('password', password);
            console.log(userInfo);
            const response = await fetch(`http://localhost:5000/api/users/signup`, {
                method: 'POST',
                body: userInfo,
            });
            const responseData = await response.json();
            auth.login(responseData.userId, responseData.token);
            //console.log(`Submit attempt? ${submitAttempt}`);
        }
        else {
            userData = {
                email,
                password
            }
            const response = await fetch(`http://localhost:5000/api/users/login`, {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {'Content-Type': 'application/json'}
            });
            const responseData = await response.json()
            auth.login(responseData.id, responseData.token);
            props.history.push('/')
        }
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
                <button disabled = {!(state.isEmailValid && state.isPasswordValid)}type = 'submit'>Login</button>
            </form>
            <button onClick = {switchModeHandler}>Switch to signup</button>
            </div>
        :
        <div>
        <form onSubmit = {authHandler}>
            Name <input onBlur = {onNameBlurHandler} onChange = {nameChangeHandler} type = 'text'></input>  {isNameActive ? '' : (state.isNameValid ? '' : 'Please enter a name')}
            <ImageUpload onImageUpload = {onImageUpload} />
            Email <input onBlur = {onEmailBlurHandler} onChange = {emailChangeHandler} type = 'text'></input> {isEmailActive ? '' : (state.isEmailValid ? '' : 'Please enter a valid email')}
            Password <input onBlur = {onPasswordBlurHandler} onChange = {passwordChangeHandler} type = 'text'></input> {isPasswordActive ? '' : (state.isPasswordValid ? '' : 'Please enter a password with a minimum of 6 characters')}
            <button disabled = {!(state.isNameValid && state.isEmailValid && state.isPasswordValid && image)} type = 'submit'>Login</button>
        </form>
        <button onClick = {switchModeHandler}>Switch to login</button>
        </div>
    }
        
       </div>
    )
};

export default withRouter(Auth);