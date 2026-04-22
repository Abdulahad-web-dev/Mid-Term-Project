import React, { useState } from 'react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Handle login functionality
    };

    const quickLoginBuyer = () => {
        setEmail('abdulahad.web9@gmail.com');
        setPassword('12345678');
    };

    const quickLoginSeller = () => {
        setEmail('abdulahad.web96@gmail.com');
        setPassword('12345678');
    };

    return (
        <div>
            <button onClick={quickLoginBuyer}>Quick Login as Buyer</button>
            <button onClick={quickLoginSeller}>Quick Login as Seller</button>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;