import React, { useContext, useState, useReducer, useRef } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import validate from "../reducers/validate";
import { withRouter } from "react-router-dom";
import AuthContext from "../context/auth-context";
import ImageUpload from "../components/ImageUpload";
import LoginBox from "../components/LoginBox";
import { useHttpClient } from "../hooks/http-hook";
import LoaderSpinner from "../components/Loader";
import ErrorModal from "../components/ErrorModal";
import FormContainer from "../components/FormContainer";

const initialState = {
  isNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
};

const Login = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const auth = useContext(AuthContext);
  const [charactersRemaining, setCharactersRemaining] = useState(20);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
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
    if (fileIsValid) {
      const imagePicked = [data];
      setImage(imagePicked[0]);
    }
  };
  const authHandler = async (e) => {
    e.persist();
    e.preventDefault();
    //console.log('hi');
    let userData;
    userData = {
      email,
      password,
    };
    try {
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/login`,
        "POST",
        JSON.stringify(userData),
        { "Content-Type": "application/json" }
      );
      // await fetch(`http://localhost:5000/api/users/login`, {
      //     method: 'POST',
      //     body: JSON.stringify(userData),
      //     headers: {'Content-Type': 'application/json'}
      // });
      ///const responseData = await response.json();
      auth.login(responseData.id, responseData.token);
      props.history.push("/animedash");
    } catch (err) {}
  };
  const nameChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 20) {
      setName(e.target.value);
      setCharactersRemaining(20 - e.target.value.length);
      dispatch({ type: "CHANGE_NAME", val: e.target.value });
    }
  };
  const emailChangeHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    dispatch({ type: "CHANGE_EMAIL", val: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    dispatch({ type: "CHANGE_PASSWORD", val: e.target.value });
  };
  const onNameBlurHandler = () => {
    setIsNameActive(false);
  };
  const onEmailBlurHandler = () => {
    if (email.length > 0) {
      setIsEmailActive(false);
    }
  };
  const onPasswordBlurHandler = () => {
    if (password.length > 0) {
      setIsPasswordActive(false);
    }
  };
  const onLoginHandler = () => {
    props.history.push("/register");
  };

  const checkboxChangeHandler = () => {
    let checkboxState = !checkbox;
    setCheckbox((prevState) => !prevState);
    if (checkboxState === true) {
      // if it's true rigiht now it's about to turn false
      loginPassVisible.current.type = "text";
      // console.log(loginPassVisible.current);
    } else {
      loginPassVisible.current.type = "password";
    }
  };
  return (
    <Container className="form-container">
      <Row className="form-row">
        <h1 className="auth-page__title">Sign In</h1>
        <Form onSubmit={authHandler} className="login-form">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailChangeHandler}
              onBlur={onEmailBlurHandler}
              value={email}
              autocomplete="off"
            />
            {isEmailActive ? (
              ""
            ) : state.isEmailValid ? (
              ""
            ) : (
              <Form.Text className="error-text">
                Please enter a valid email
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={onPasswordBlurHandler}
              ref={loginPassVisible}
              value={password}
              autocomplete="off"
            />
            {isPasswordActive ? (
              ""
            ) : state.isPasswordValid ? (
              ""
            ) : (
              <Form.Text className="error-text">
                Minimum of 6 characters
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group
            className="show-password__row"
            controlId="formBasicCheckbox"
          >
            <Form.Check
              checked={checkbox}
              onChange={checkboxChangeHandler}
              type="checkbox"
            />
            <Form.Text>Show password</Form.Text>
          </Form.Group>
          <Row>
            <Button
              className="auth-btn"
              variant="primary"
              type="submit"
              disabled={!(state.isEmailValid && state.isPasswordValid)}
            >
              <h3>Sign In</h3>
            </Button>
            <Button onClick={onLoginHandler} variant="secondary" type="button">
              <h3>Register</h3>
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
