import './navbar.css'
import { useState } from 'react';
import Button from '../Button/button'
import { Link } from "react-router-dom";
import { Menu, Tent } from 'lucide-react';
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
                    <div className="logo" onClick={() => { <Link to="/" /> }}>
                        <Tent size={45} color="#000" strokeWidth={1.3} />
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
                        <Button className="auth-login" text="Login" onClick={() => setShowAuth(true)} />
                        <Button className="auth-signup" text="Sign Up" onClick={() => setShowAuth(true)} />
                        <button className='menu-icon-btn' onClick={toggleMenu} >
                            <Menu color='#000' strokeWidth={3} className="menu-icon" />
                        </button>
                    </div>
                </nav>
                {menu && (
                    <div className="menu">
                        <img className='close-btn' src="/close-white.png" alt="close-icon" onClick={() => { setMenu(false) }} />
                        <li className="menu-items"><Link to="/" id='link'>Home</Link></li>
                        <li className="menu-items"><Link to="/blog" id='link'>Blog</Link></li>
                        <li className="menu-items"><Link to="/aboutus" id='link'>About Us</Link></li>
                        <li className="menu-items"><Link to="/help" id='link'>Help</Link></li>
                        <li className="menu-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                    </div>
                )}
            </header>
            {showAuth && (
                <div className="auth-modal-overlay">
                    <div className="auth-modal">
                        <button
                            className="close-btn"
                            onClick={() => setShowAuth(false)}
                        >
                            X
                        </button>

                        <Auth onSuccess={() => setShowAuth(false)} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar
