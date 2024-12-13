import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./adminStyle/modifyUsers.css"

const ModifyUser = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/users', {
                auth: {
                    username: 'admin',
                    password: '12345'
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('An error occurred while fetching users.');
        }
    };

    const banUser = async (user) => {
        try {
            const response = await axios.put(`http://localhost:8080/admin/users/ban/${user.username}`, {}, {
                auth: {
                    username: 'admin',
                    password: '12345'
                }
            });
            console.log(response.data);
            // Update the user's status in the local state
            setUsers(users.map(u => u.username === user.username ? { ...u, isBanned: true } : u));
        } catch (error) {
            console.error('An error occurred while trying to ban the user.');
        }
    };

    const unbanUser = async (user) => {
        try {
            const response = await axios.put(`http://localhost:8080/admin/users/unban/${user.username}`, {}, {
                auth: {
                    username: 'admin',
                    password: '12345'
                }
            });
            console.log(response.data);
            // Update the user's status in the local state
            setUsers(users.map(u => u.username === user.username ? { ...u, isBanned: false } : u));
        } catch (error) {
            console.error('An error occurred while trying to unban the user.');
        }
    };

    const deleteUser = async (user) => {
        try {
            const response = await axios.delete(`http://localhost:8080/admin/users/${user.username}`, {
                auth: {
                    username: 'admin',
                    password: '12345'
                }
            });
            console.log(response.data);
            // Remove the user from the local state
            setUsers(users.filter(u => u.username !== user.username));
        } catch (error) {
            console.error('An error occurred while trying to delete the user.');
        }
    };

    return (
        <div>
            <table>
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.username}>
                        <td>{user.username}</td>
                        <td>{user.isBanned ? 'Banned' : 'Active'}</td>
                        <td>
                            {user.isBanned ? (
                                <button className="unban" onClick={() => unbanUser(user)}>Unban</button>
                            ) : (
                                <button className="ban" onClick={() => banUser(user)}>Ban</button>
                            )}
                        </td>
                        <td>
                            <button className="delete" onClick={() => deleteUser(user)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModifyUser;
