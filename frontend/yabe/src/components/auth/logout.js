import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
    const history = useHistory();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch('/api/logout', { method: 'POST' });
                if (response.ok) {
   
                    history.push('/login');
                }
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        logoutUser();
    }, [history]);

    return <div>Logging out</div>; 
};

export default Logout;
