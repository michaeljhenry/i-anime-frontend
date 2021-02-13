import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import NewUserCard from "../components/NewUserCard";
import { useHttpClient } from "../hooks/http-hook";
import LoaderSpinner from "../components/Loader";
import Message from "../components/Message";
import NameContext from "../context/name-context";
const UsersDashboardPage = () => {
  const nameContext = useContext(NameContext);
  const [activeUsers, setActiveUsers] = useState([]);

  const { isLoading, error, sendRequest } = useHttpClient();
  useEffect(() => {
    return () => {
      nameContext.setNameFunction("");
    };
  }, []); // if we swap pages and come back to this page, we don't still want old search results. when we unmount, reset the search to all users.

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/users/${nameContext.name}`
        );
        // await fetch(`http://localhost:5000/api/users`,
        // {
        //     method: 'GET',
        //     body: null,
        //     headers: {}
        // });
        setActiveUsers(responseData.users);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest, nameContext.name]);

  return (
    <Container className="usersdashboard--container">
      {isLoading && <LoaderSpinner />}
      {!isLoading && error && (
        <Message variant="danger">{error.message}</Message>
      )}
      {!isLoading && activeUsers.length < 0 && (
        <Message>No Users Registered</Message>
      )}
      {!isLoading &&
        activeUsers.length > 0 &&
        activeUsers.map((user) => (
          <NewUserCard
            key={user.email}
            name={user.name}
            id={user.id}
            image={user.image}
            animes={user.animes}
          />
        ))}
    </Container>
  );
};

export default UsersDashboardPage;
