import React, { useContext, useState, useReducer, useRef } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import validate from "../reducers/validate";
import AuthContext from "../context/auth-context";
import ImageUpload from "../components/ImageUpload";
import { useHttpClient } from "../hooks/http-hook";
import LoaderSpinner from "../components/Loader";
import Message from "../components/Message";

const initialState = {
  isNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
};

const Register = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);
  const [charactersRemaining, setCharactersRemaining] = useState(30);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const signupPassVisible = useRef();

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
    e.preventDefault();
    console.log("hi");
    const userInfo = new FormData();
    userInfo.append("name", name);
    userInfo.append("image", image);
    userInfo.append("email", email); // this is the key fileUpload.single('image') is looking for in our backend
    userInfo.append("password", password);
    try {
      const response = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/users/signup`,
        "POST",
        userInfo
      );
      auth.login(response.userId, response.token);
      setImage("");
      props.history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  const nameChangeHandler = (e) => {
    e.preventDefault();
    if (e.target.value.length <= 30) {
      setName(e.target.value);
      setCharactersRemaining(30 - e.target.value.length);
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
  const signInHandler = () => {
    // setAuthMode(!authMode);
    // setEmail("");
    // setPassword("");
    // setName("");
    // setIsNameActive(true);
    // setIsEmailActive(true);
    // setIsPasswordActive(true);
    // setImage("");
    props.history.push("/login");
  };

  const checkboxChangeHandler = () => {
    let checkboxState = !checkbox;
    setCheckbox((prevState) => !prevState);
    if (checkboxState === true) {
      // if it's true rigiht now it's about to turn false
      signupPassVisible.current.type = "text";
    } else {
      signupPassVisible.current.type = "password";
    }
  };
  return (
    <Container className="form-container">
      {isLoading && <LoaderSpinner />}
      <Row className="form-row">
        <h1 className="auth-page__title">Register </h1>
        {error && <Message variant="danger">{error.message}</Message>}

        <Form onSubmit={authHandler} className="login-form">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              onChange={nameChangeHandler}
              onBlur={onNameBlurHandler}
              value={name}
              autoComplete="off"
            />
            <Form.Text style={{ fontSize: "14px" }}>
              Characters Remaining: {charactersRemaining}
            </Form.Text>

            {isNameActive ? (
              ""
            ) : state.isNameValid ? (
              ""
            ) : (
              <Form.Text className="error-text">
                Please enter a valid name
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={emailChangeHandler}
              onBlur={onEmailBlurHandler}
              value={email}
              autoComplete="off"
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
          <Form.Group>
            <ImageUpload onImageUpload={onImageUpload} />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={onPasswordBlurHandler}
              ref={signupPassVisible}
              value={password}
              autoComplete="off"
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
              disabled={
                !(
                  state.isNameValid &&
                  state.isEmailValid &&
                  state.isPasswordValid &&
                  image
                )
              }
            >
              <h3>Register</h3>
            </Button>
            <Button onClick={signInHandler} variant="secondary" type="button">
              <h3>Sign In</h3>
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default Register;
