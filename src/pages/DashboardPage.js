import React, { useState, useEffect, useContext } from 'react';
import UserCard from '../components/UserCard';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from '../components/Loader';
import ErrorModal from '../components/ErrorModal';
import NameContext from '../context/name-context';
const DashboardPage = () => {
    const nameContext = useContext(NameContext);
    const [activeUsers, setActiveUsers] = useState([]);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    useEffect(() => {
     
            return () => {
                nameContext.setNameFunction('');
            }
        
    }, []) // if we swap pages and come back to this page, we don't still want old search results. when we unmount, reset the search to all users.

    useEffect(() => {
        const getUsers = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${nameContext.name}`);
                // await fetch(`http://localhost:5000/api/users`,
                // {
                //     method: 'GET',
                //     body: null,
                //     headers: {}
                // });
                setActiveUsers(responseData.users);
            } catch(err) {}
        }
        getUsers();
    }, [sendRequest, nameContext.name]);

    return (
        <React.Fragment>
            {error && <ErrorModal error={error.message} show = {!!error} onCancel = {clearError} />}
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <ul className = 'users-container'>
                {activeUsers.length > 0 ? 
                activeUsers.map((user) => (
                    <li className = 'user-item' key = {user.email}>
                        <UserCard key = {user.email} name = {user.name} id = {user.id} image = {user.image} animes = {user.animes}/>
                    </li>
                ))
                : <div className = 'no-users__card'><h3>No Users Registered</h3></div>}
            </ul>
            }
        </React.Fragment>
    )
}

export default DashboardPage