import { useEffect } from 'react';

const Logout = ({ onLogout }) => {
    useEffect(() => {
        console.log("Logging out...");
        const logoutUser = async () => {
            try {
                const response = await fetch("/logout", { method: "POST" });
                if (response.ok) {
                    // Clear localStorage
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');

                    // Call onLogout callback to update parent component state
                    onLogout();
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error logging out:", error);
            }
        };

        // Run the logout logic if logoutTriggered is true
        logoutUser();
    }, [onLogout]);

    return null;
};

export default Logout;
