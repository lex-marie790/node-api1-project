import React, { useState } from 'react';
import axios from 'axios';

const initialUser = {
    name:'',
    bio:''
};

function AddUser() {
    const [user, setUser] = useState([]);
    const [value, setValue] = useState(initialUser);

    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/users', value)
        .then(res => {
            console.log(res, value)
        }) .catch(err => console.log(err))
    }

    return(
        <form onSubmit={handleSubmit}>
            <h2>Add User</h2>
            <input
                name='name'
                value={value.name}
                onChange={handleChange}
            />
            <input
                name='bio'
                value={value.bio}
                onChange={handleChange}
            />
            <button type='submit'>Add User</button>
        </form>
    )
}

export default AddUser;