import { Link } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { googleAuthAPI } from '../utils/api.js';

const Navbar = () => {
    const { user, login: authLogin, logout: authLogout } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // Get user info from Google
                const userData = await googleAuthAPI.getUserInfo(tokenResponse.access_token);
                console.log("Google user data:", userData);

                // Try to authenticate with backend
                try {
                    const data = await googleAuthAPI.authenticate({
                        email: userData.email,
                        name: userData.name,
                        picture: userData.picture,
                        access_token: tokenResponse.access_token
                    });

                    authLogin(
                        { email: userData.email, name: userData.name, picture: userData.picture },
                        { backendToken: data.token, googleToken: tokenResponse.access_token }
                    );
                    alert("Successfully logged in as " + userData.email);
                } catch (backendError) {
                    console.warn("Backend authentication failed, proceeding with client-only auth:", backendError);
                    // Fallback: store user info without backend token
                    authLogin(
                        { email: userData.email, name: userData.name, picture: userData.picture },
                        { googleToken: tokenResponse.access_token }
                    );
                    alert("Logged in as " + userData.email + " (client-only mode)");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("Login failed: " + error.message);
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.error("Google login error:", error);
            alert("Google login failed. Please try again.");
            setIsLoading(false);
        }
    });

    const logout = () => {
        authLogout();
        alert("Logged out successfully");
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <i className="bi bi-leaf-fill me-2"></i>
                    PlantDoc
                </Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/upload">Upload</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/experts">Experts</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                    </ul>
                    {user ? (
                        <div className="d-flex align-items-center">
                            <span className="me-3 text-light">
                                Welcome, {user.name || user.email}
                            </span>
                            <button onClick={logout} className="btn btn-outline-light">
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => login()} 
                            className="btn btn-custom"
                            disabled={isLoading}
                        >
                            <i className="bi bi-google me-2"></i>
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;