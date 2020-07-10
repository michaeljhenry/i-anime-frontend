import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/auth-context';
import UserCard from '../components/UserCard';
import {useHttpClient} from '../hooks/http-hook';
import LoadingSpinner from '../components/Loader';
import ErrorModal from '../components/ErrorModal';
const DashboardPage = () => {
    const auth = useContext(AuthContext);
    const [activeUsers, setActiveUsers] = useState([]);
    const [name, setName] = useState('');
    const [finalName, setFinalName] = useState('');

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const searchUsersHandler = async () => {
        try {
            const usersList = await sendRequest(`http://localhost:5000/api/animes/search/${name}`);
        } catch(err) {}

    }
    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }
    useEffect(() => {
        const getUsers = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/users/${name}`);
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
    }, [sendRequest, finalName]);

    return (
        <React.Fragment>
            {error && <ErrorModal error={error.message} show = {!!error} onCancel = {clearError} />}
            {isLoading && <LoadingSpinner/>}
            <form className = 'testing-something' onSubmit = {(e) => {e.preventDefault(); setFinalName(name)}}>
                <input className = 'hi' onChange = {nameChangeHandler} style = {{fontWeight: "bold"}} type = 'text' placeholder = 'Search user by name'></input>
                {auth.token ? <button className = 'logout-btn__main' onClick = {auth.logout}>Logout</button> : ''} 
             </form>
            {!isLoading && <ul className = 'users-container'>
                {activeUsers.length > 0 ? 
                activeUsers.map((user) => (
                    <li className = 'user-item' key = {user.email}>
                        <UserCard key = {user.email} name = {user.name} id = {user.id} image = {user.image} animes = {user.animes}/>
                    </li>
                ))
                : 'No Users'}
            </ul>
            }
        </React.Fragment>
    )
}

export default DashboardPage