import './navbar.css'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button/button'
import { Link } from "react-router-dom";
import { CircleUserRound, Menu, Tent, X, LogOut, Backpack } from 'lucide-react';
import Auth from '../Authentication/auth.jsx';

const Navbar = () => {
    const navigate = useNavigate();

    const [menu, setMenu] = useState(false);
    const [showAuth, setShowAuth] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const toggleMenu = () => {
        setMenu(true);
    }

    const profileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    }

    return (
        <>
            <header>
                <nav className="navbar-container">
                    <div className="logo">
                        <Tent size={42} strokeWidth={1.5} color='#000' />
                        <h1 className="logo-txt">Camporia</h1>
                    </div>
                    <div>
                        <ul>
                            <li className="li-items"><Link to="/" id='link'>About</Link></li>
                            <li className="li-items"><Link to="/campsites" id='link'>Campsites</Link></li>
                            <li className="li-items"><Link to="/help" id='link'>Help</Link></li>
                            <li className="li-items"><Link to="/blog" id='link'>Blog</Link></li>
                            <li className="li-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                        </ul>
                    </div>
                    <div className='auth-btn-container'>
                        {isLoggedIn ? (
                            <CircleUserRound className={`auth-icon`} size={32} strokeWidth={1.5} onClick={() => { handleLogout }} />
                        ) : (
                            <CircleUserRound className={`auth-icon`} size={32} strokeWidth={1.5} onClick={() => { setAuthMode("login"); setShowAuth(true) }} />
                        )}
                        {isLoggedIn ?
                            (<CircleUserRound className={`auth-icon-lg`} size={32} strokeWidth={1.5} onClick={profileMenu} />)
                            : (
                                <>
                                    <Button className={`auth-login ${authMode === "login" ? "active" : ""}`} text="Login" onClick={() => { setAuthMode("login"); setShowAuth(true) }} />
                                    <Button className={`auth-signup ${authMode === "signup" ? "active" : ""}`} text="Sign Up" onClick={() => { setAuthMode("signup"); setShowAuth(true) }} />
                                </>
                            )
                        }
                        <button className='menu-icon-btn' onClick={toggleMenu} >
                            <Menu color='#000' size={32} strokeWidth={1.5} className="menu-icon" />
                        </button>
                    </div>
                </nav>
                {menu && (
                    <div className="menu">
                        <X className='close-btn' onClick={() => { setMenu(false) }} />
                        <li className="menu-items"><Link to="/" id='link'>About</Link></li>
                        <li className="menu-items"><Link to="/campsites" id='link'>Campsites</Link></li>
                        <li className="menu-items"><Link to="/help" id='link'>Help</Link></li>
                        <li className="menu-items"><Link to="/blog" id='link'>Blog</Link></li>
                        <li className="menu-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                    </div>
                )}
            </header>
            {showAuth && (
                <div
                    className="auth-modal-overlay"
                    onClick={() => setShowAuth(false)}
                >
                    <div
                        className="auth-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-btn"
                            onClick={() => setShowAuth(false)}
                        >
                            <X color='#000' />
                        </button>

                        <Auth mode={authMode} onSuccess={() => setShowAuth(false)} />
                    </div>
                </div>
            )}
            {showProfileMenu && (
                <div className="profile-menu-overlay" onClick={() => setShowProfileMenu(false)}>
                    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
                        <p className='profile-menu-option' onClick={() => { navigate('/profile') }}><CircleUserRound /> <p>Profile</p></p>
                        <p className='profile-menu-option' onClick={() => { navigate('/bookings') }}><Backpack /> <p>Bookings</p></p>
                        <p className='profile-menu-option' onClick={handleLogout}><LogOut color='#904e4e' /> <p style={{color: "#904e4e"}}>Logout</p></p>
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
