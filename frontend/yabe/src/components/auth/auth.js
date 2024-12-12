// Function to get Basic Auth header
export const getAuthHeader = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    if (username && password) {
        const encodedCredentials = btoa(`${username}:${atob(password)}`);
        return {
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/json',
        };
    }
    return {};
};

// Function to fetch data with Basic Authentication
export const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: getAuthHeader(),
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Authentication failed or data not found');
        }
    } catch (err) {
        console.error('Error fetching data:', err);
        return null;
    }
};

// Function to send data with Basic Authentication
export const sendData = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: getAuthHeader(),
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw new Error('Failed to send data');
        }
    } catch (err) {
        console.error('Error sending data:', err);
        return null;
    }
};

// Function to log out
export const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
};
