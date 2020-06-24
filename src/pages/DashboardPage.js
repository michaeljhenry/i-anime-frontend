import React, { useState, useEffect } from 'react';
import UserCard from '../components/UserCard';
const DashboardPage = () => {
    const [activeUsers, setActiveUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
            const users = await fetch(`http://localhost:5000/api/users`,
            {
                method: 'GET',
                body: null,
                headers: {}
            });
            const responseData = await users.json(); // without json it returns a cors response
            setActiveUsers(responseData.users);
        } catch(err) {}
        }
        getUsers();
    }, []) // empty dependency list means i only want it t o render once upon mounting

    return (
        <div>
            {activeUsers.length > 0 ? 
            activeUsers.map((user) => (
                <UserCard key = {user.email} name = {user.name} id = {user.id} image = {user.image}/>
            ))
            : 'No Users'}
        </div>
    )
}

export default DashboardPage