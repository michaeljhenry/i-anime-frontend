import React, { useContext, useState, useReducer, useRef } from "react";
import { Container, Form, Button, Row } from "react-bootstrap";
import validate from "../reducers/validate";
import AuthContext from "../context/auth-context";
import { useHttpClient } from "../hooks/http-hook";
import LoaderSpinner from "../components/Loader";
import Message from "../components/Message";

const initialState = {
  isNameValid: false,
  isEmailValid: false,
  isPasswordValid: false,
};

const Login = (props) => {
  const { isLoading, error, sendRequest } = useHttpClient();

  const auth = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const loginPassVisible = useRef();

  const [isEmailActive, setIsEmailActive] = useState(true);
  const [isPasswordActive, setIsPasswordActive] = useState(true);

  const [state, dispatch] = useReducer(validate, initialState);

  const authHandler = async (e) => {
    e.persist();
    e.preventDefault();
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
      auth.login(responseData.id, responseData.token);
      props.history.push("/");
    } catch (err) {
      console.log(err);
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
  const onSignupHandler = () => {
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
      {isLoading && <LoaderSpinner />}

      <Row className="form-row">
        <h1 className="auth-page__title">Sign In</h1>
        {error && <Message variant="danger">{error.message}</Message>}
        <Form onSubmit={authHandler} className="login-form">
          <Form.Group controlId="formBasicEmail">
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
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordChangeHandler}
              onBlur={onPasswordBlurHandler}
              ref={loginPassVisible}
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
              disabled={!(state.isEmailValid && state.isPasswordValid)}
            >
              <h3>Sign In</h3>
            </Button>
            <Button onClick={onSignupHandler} variant="secondary" type="button">
              <h3>Register</h3>
            </Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default Login;
