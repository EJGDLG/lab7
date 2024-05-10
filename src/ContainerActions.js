import React, { useEffect } from 'react';

export const handleRegisterClick = () => {
    const container = document.getElementById('container');
    container.classList.add("active");
};

export const handleLoginClick = () => {
    const container = document.getElementById('container');
    container.classList.remove("active");
};

function App() {
    useEffect(() => {
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', handleRegisterClick);
        loginBtn.addEventListener('click', handleLoginClick);

        // Cleanup
        return () => {
            registerBtn.removeEventListener('click', handleRegisterClick);
            loginBtn.removeEventListener('click', handleLoginClick);
        };
    }, []);

    return (
        <div>
            <div id="container">
                {/* Tu contenido aquí */}
            </div>
            <button id="register">Register</button>
            <button id="login">Login</button>
        </div>
    );
}

export default App;
