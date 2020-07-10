import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialUser = {
    name:'',
    bio:''
};

function AddUser() {
    const [users, setUsers] = useState([]);
    const [value, setValue] = useState(initialUser);
    const [edit, setEdit] = useState(false);
    
    const handleChange = e => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
          });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(value.name && value.bio) {
            if(!edit) {
            axios.post("http://localhost:5000/api/users", value)
              .then(res => {
                setUsers([...users, res.data]);
                setValue(initialUser);
              })
                .catch(err => {
                    console.log(err.response, err.message);
                });
            } else {
              axios.put(`http://localhost:5000/api/users/${value.id}`, value)
                .then(res => {
                  setUsers(users.map(user => {
                    if(user.id === res.data.id) {
                      return res.data;
                    }
                    return user;
                  }));
                  setValue(initialUser);
                  setEdit(false);
                })
                    .catch(err => {
                    console.log(err.response, err.message);
                    });
            }
          }
        }


    const deleteUser = user => {
        axios.delete(`http://localhost:5000/api/users/${user.id}`)
        .then(res => {
            setUsers(users.filter(user => user !== res.data));
            getUsers();
        }) .catch(err => {
            console.log('deleteUser', err.res.data, err.message)
        })
    }

    const editUser = user => {
        setValue(user);
        setEdit(true);
    }

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:5000/api/users')
        .then(res => {
            setUsers(res.data);
        }) .catch(err => {
            console.log('getUsers', err.res.data, err.message)
        })
    }
    return(
        <div className='app'>
            <div className='form'>
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
            </div>
                <div className = "users">
                <p>Delete & Edit User Info</p>
                    {users.map(user => {
                    return (
                        <div key = {user.id} className = "user-card">
                        <p>Name: {user.name}</p>
                        <p>Bio: {user.bio}</p>
                        <p>ID: {user.id}</p>
                        <button onClick = {() => editUser(user)}>Edit</button>
                        <button onClick = {() => deleteUser(user)}>Delete</button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default AddUser;