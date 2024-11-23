import { useState, useContext } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './login.css'; 
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/user/login", { email, password }, { withCredentials: true });
            if (response.status === 200) {
                login(response.data.token);
            }
        } catch (error) {
            console.log(error.message);
            message.error('Incorrect username or password.');
        }
    }

    return (
        <div className="login-container">
            <div className="form-container">
                <div className="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <form onSubmit={handleLogin}>
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
                        <button type="submit">Login</button>
                    </div>
                </form>
                <div className="signup-link">
                    <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
