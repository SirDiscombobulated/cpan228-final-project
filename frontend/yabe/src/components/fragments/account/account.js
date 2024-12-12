import React from 'react';
import { Link } from 'react-router-dom';

const AccountPage = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h1>Account Page</h1>
            <Link to="/account-info" style={{ textDecoration: 'none' }}>
                <button style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>Account Info</button>
            </Link>
            <Link to="/edit-profile" style={{ textDecoration: 'none' }}>
                <button style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>Edit Profile</button>
            </Link>
            <Link to="/wishlist" style={{ textDecoration: 'none' }}>
                <button style={{ margin: '10px', padding: '10px', fontSize: '16px' }}>Wishlist</button>
            </Link>
        </div>
    );
}

export default AccountPage;
