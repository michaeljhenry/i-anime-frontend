import React, {useState, useContext} from 'react';
import NameContext from '../context/name-context';

const SearchUsers = () => {
    const nameContext = useContext(NameContext)
    const [name, setName] = useState('');
    const nameChangeHandler = (e) => {
        setName(e.target.value)
    }

    return(
        <React.Fragment>
        <form className = 'testing-something' onSubmit = {(e) => {e.preventDefault(); nameContext.setNameFunction(name)}}>
            <input className = 'hi' onChange = {nameChangeHandler} style = {{fontWeight: "bold"}} type = 'text' placeholder = 'Search user by name'></input>
        </form>

        </React.Fragment>
    )
};

export default SearchUsers;