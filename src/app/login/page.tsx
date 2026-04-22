import React from 'react';
import { Button } from 'your-ui-library';  // adjust according to your UI library

const LoginPage = () => {
    const handleBuyerLogin = () => {
        document.getElementById('email').value = 'abdulahad.web9@gmail.com';
        document.getElementById('password').value = '12345678';
    };

    const handleSellerLogin = () => {
        document.getElementById('email').value = 'abdulahad.web96@gmail.com';
        document.getElementById('password').value = '12345678';
    };

    return (
        <div>
            <h1>Login</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Button onClick={handleBuyerLogin} style={{ flex: '1', marginRight: '10px' }}>
                    <i className="buyer-icon" /> Buyer Login
                </Button>
                <Button onClick={handleSellerLogin} style={{ flex: '1', marginLeft: '10px' }}>
                    <i className="seller-icon" /> Seller Login
                </Button>
            </div>
            <form>
                <input type="email" id="email" placeholder="Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;