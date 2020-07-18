import React, {useContext, useState, useReducer, useRef} from 'react';
import validate from '../reducers/validate';
import {withRouter} from 'react-router-dom';
import AuthContext from '../context/auth-context';
import ImageUpload from '../components/ImageUpload';
import LoginBox from '../components/LoginBox';
import {useHttpClient} from '../hooks/http-hook';
import LoaderSpinner from '../components/Loader';
import ErrorModal from '../components/ErrorModal';
// import '../styles/pages/Auth.css';

const initialState = {
    isNameValid: false,
    isEmailValid: false,
    isPasswordValid: false
}
const Auth = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);
    const [charactersRemaining, setCharactersRemaining] = useState(20);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [password, setPassword] = useState('');
    //const [submitAttempt, setSubmitAttempt] = useState(false);
    const [authMode, setAuthMode] = useState(true);
    const [checkbox, setCheckbox] = useState(false);
    const signupPassVisible = useRef();
    const loginPassVisible = useRef();
    
    const [isNameActive, setIsNameActive] = useState(true);
    const [isEmailActive, setIsEmailActive] = useState(true);
    const [isPasswordActive, setIsPasswordActive] = useState(true);




    const [state, dispatch] = useReducer(validate, initialState);

    const onImageUpload = (data, fileIsValid) => {
        if(fileIsValid) {
            const imagePicked = [data];
            setImage(imagePicked[0]);
        }
    }
    const authHandler = async (e) => {
        e.persist();
        e.preventDefault();
        //console.log('hi');
        let userData;
        if(!authMode) {
            const userInfo = new FormData();
            userInfo.append('name', name);
            userInfo.append('image', image);
            userInfo.append('email', email); // this is the key fileUpload.single('image') is looking for in our backend
            userInfo.append('password', password);
            //console.log(userInfo);
            try {
            const response = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/users/signup`, 'POST', userInfo)
            //console.log(response);
            // await fetch(`http://localhost:5000/api/users/signup`, {
            //     method: 'POST',
            //     body: userInfo,
            // });
            //const responseData = await response.json();
            auth.login(response.userId, response.token);
            } catch(err) {}
            setImage('');
            ////console.log(`Submit attempt? ${submitAttempt}`);
        }
        else {
            userData = {
                email,
                password
            }
            try {
            const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + `/users/login`, 'POST', JSON.stringify(userData), {'Content-Type': 'application/json'})
            // await fetch(`http://localhost:5000/api/users/login`, {
            //     method: 'POST',
            //     body: JSON.stringify(userData),
            //     headers: {'Content-Type': 'application/json'}
            // });
            ///const responseData = await response.json();
            auth.login(responseData.id, responseData.token);
            props.history.push('/')
            } catch(err){};
        }
    }
    const nameChangeHandler = (e) => {
        e.preventDefault();
        if (e.target.value.length <= 20 ) {
            setName(e.target.value);
            setCharactersRemaining(20 - e.target.value.length);
            dispatch({type: 'CHANGE_NAME', val: e.target.value});
        }
    };
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
        setEmail('');
        setPassword('');
        setName('');
        setIsNameActive(true);
        setIsEmailActive(true);
        setIsPasswordActive(true);
        setImage('');
    }

    const checkboxChangeHandler = () => {
        let checkboxState = !checkbox;
        setCheckbox((prevState) => !prevState);
        if(checkboxState === true) { // if it's true rigiht now it's about to turn false
            if(authMode === true) {
                loginPassVisible.current.type = "text"
                console.log(loginPassVisible.current);
            } else {
                signupPassVisible.current.type = "text"
            }
        }
        else {
            if(authMode === true) {
                loginPassVisible.current.type = "password"
            } else {
                signupPassVisible.current.type = "password"
            }
        }
    };

    return(
        <div>
        {error && <ErrorModal error={error} show = {!!error} onCancel = {clearError} />}
        {isLoading && <LoaderSpinner/>}
        {!isLoading && 
        <LoginBox size = {authMode === true ? 'small' : 'large'}>
        {authMode === true ?
            <div>
            <form className = {`login-box`} onSubmit = {authHandler}>
                    <p>Email</p> 
                    <input 
                        className = {isEmailActive ? '' : (state.isEmailValid ? '' : 'error')}
                        onBlur = {onEmailBlurHandler} onChange = {emailChangeHandler} type = 'text'
                        value = {email}
                    />
                    {isEmailActive ? '' : (state.isEmailValid ? '' : <p className = 'error-text'>Please enter a valid email</p>)}
                    <p>Password</p>
                    <input 
                        className = 'auth-input' 
                        onBlur = {onPasswordBlurHandler} onChange = {passwordChangeHandler}
                        value = {password}
                        ref = {loginPassVisible}
                        type = "password"
                    />
                    <br></br>
                    <input type="checkbox" style = {{marginLeft: "0px", marginRight: "10px"}} checked = {checkbox} onChange = {checkboxChangeHandler}/>Show Password
                    {isPasswordActive ? '' : (state.isPasswordValid ? '' : <p className = 'error-text'>Minimum of 6 characters</p>)}
                    <button 
                        disabled = {!(state.isEmailValid && state.isPasswordValid)}
                        type = 'submit'>Login
                    </button>
            </form>
            <button onClick = {switchModeHandler}>Switch to signup</button>
            </div>
        :
        <div>
        <form className = 'login-box' onSubmit = {authHandler}>
            <p>Name</p> 
             <input 
                className = {isNameActive ? '' : (state.isNameValid ? '' : 'error')}
                onBlur = {onNameBlurHandler} 
                onChange = {nameChangeHandler} 
                type = 'text'
                value = {name}
             />
             <div style = {{fontSize: "14px"}}>Characters Remaining: {charactersRemaining}</div>
             {isNameActive ? '' : (state.isNameValid ? '' : <p className = 'error-text'>Please enter a name</p>)}
            <ImageUpload className = 'image' onImageUpload = {onImageUpload} />
            <p>Email</p>
            <input 
                className = {isEmailActive ? '' : (state.isEmailValid ? '' : 'error')}
                onBlur = {onEmailBlurHandler} 
                onChange = {emailChangeHandler} 
                type = 'text'
                value = {email}
            />
            {isEmailActive ? '' : (state.isEmailValid ? '' :<p className = 'error-text'>Please enter a valid email</p>)}
            <p>Password</p> 
            <input 
                className = {isPasswordActive ? '' : (state.isPasswordValid ? '' : 'error')}
                onBlur = {onPasswordBlurHandler} 
                onChange = {passwordChangeHandler} 
                value = {password}
                ref = {signupPassVisible}
                type = "password"
            />
            <br></br>
            <input type="checkbox" style = {{marginLeft: "0px", marginRight: "10px"}} checked = {checkbox} onChange = {checkboxChangeHandler}/>Show Password

            {isPasswordActive ? '' : (state.isPasswordValid ? '' : <p className = 'error-text'>Minimum of 6 characters</p>)}
            <button 
            disabled = {!(state.isNameValid && state.isEmailValid && state.isPasswordValid && image)} 
            type = 'submit'>Signup</button>
        </form>
        <button onClick = {switchModeHandler}>Switch to login</button>
        </div>
    }
        </LoginBox>
}
       </div>

    )
};

export default withRouter(Auth);