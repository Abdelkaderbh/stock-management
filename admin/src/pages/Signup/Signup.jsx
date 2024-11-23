import { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './signup.css'; 
import logo from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            message.error('Passwords do not match.');
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/user/register", { email, password });
            if (response.status === 201) {
                message.success('Signup successful! You can now log in.');
                navigate('/login');
                
            }
        } catch (error) {
            console.log(error.message);
            message.error('Signup failed. Please try again.');
        }
    };

    return (
        <div className="signup-container">
            <div className="form-container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <form onSubmit={handleSignup}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit">Sign Up</button>
                    </div>
                </form>

                <div className="signup-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
