import React from 'react';
import { Link } from 'react-router-dom';
import './adminStyle/admin.css';

const AdminPage = () => {
    return (
        <div className="profile-page">
            <div className="profile-card">
                <h1>Admin Panel</h1>
                <nav style={{ width: '100%', padding: '20px', borderRight: 'none' }}>
                    <ul>
                        <li><Link to="admin/modify-users">Modify Users</Link></li>
                        <li><Link to="admin/modify-items">Modify Items</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default AdminPage;
