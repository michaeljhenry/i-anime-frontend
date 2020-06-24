import React from 'react';


const authContext = React.createContext({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {},
    logout: () => {}
});

export default authContext;