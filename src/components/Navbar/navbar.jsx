import './navbar.css'
import { useState } from 'react';
import Button from '../Button/button'
import { Link } from "react-router-dom";
import { CircleUser, CircleUserIcon, CircleUserRound, Menu, Tent, User, X } from 'lucide-react';
import Auth from '../Authentication/auth.jsx';

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const [showAuth, setShowAuth] = useState(false);

    const toggleMenu = () => {
        setMenu(true);
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
                            <li className="li-items"><Link to="/" id='link'>Home</Link></li>
                            <li className="li-items"><Link to="/blog" id='link'>Blog</Link></li>
                            <li className="li-items"><Link to="/aboutus" id='link'>About Us</Link></li>
                            <li className="li-items"><Link to="/help" id='link'>Help</Link></li>
                            <li className="li-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                        </ul>
                    </div>
                    <div className='auth-btn-container'>
                        <CircleUserRound className="auth-icon" size={32} strokeWidth={1.5} onClick={() => setShowAuth(true)} />
                        <Button className="auth-login" text="Login" onClick={() => setShowAuth(true)} />
                        <Button className="auth-signup" text="Sign Up" onClick={() => setShowAuth(true)} />
                        <button className='menu-icon-btn' onClick={toggleMenu} >
                            <Menu color='#000' size={32} strokeWidth={1.5} className="menu-icon" />
                        </button>
                    </div>
                </nav>
                {menu && (
                    <div className="menu">
                        <X className='close-btn' onClick={() => { setMenu(false) }} />
                        <li className="menu-items"><Link to="/" id='link'>Home</Link></li>
                        <li className="menu-items"><Link to="/blog" id='link'>Blog</Link></li>
                        <li className="menu-items"><Link to="/aboutus" id='link'>About Us</Link></li>
                        <li className="menu-items"><Link to="/help" id='link'>Help</Link></li>
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

                        <Auth onSuccess={() => setShowAuth(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
