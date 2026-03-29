import './footer.css'
import { Link } from "react-router-dom";
import { Tent, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="deco-circle deco-circle--right" />
                <div className="deco-circle deco-circle--left" />
                <div className="footer-container">
                    <div className="footer-logo">
                        <Tent className="tent-logo" size={45} color="#fff" strokeWidth={1.3} />
                        <h1 className="footer-logo-txt">Camporia</h1>
                        {/* <p className="brand-tagline">
                            Your gateway to the wild — curated camping experiences across India.
                        </p> */}
                    </div>
                    <div className="footer-links">
                        <ul>
                            <li className="footer-li-items"><Link to="/" id='link'>Home</Link></li>
                            <li className="footer-li-items"><Link to="/blog" id='link'>Blog</Link></li>
                            <li className="footer-li-items"><Link to="/aboutus" id='link'>About Us</Link></li>
                            <li className="footer-li-items"><Link to="/help" id='link'>Help</Link></li>
                            <li className="footer-li-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                        </ul>
                        <div className="icons">
                            <h2>CONNECT</h2>
                            <div className="social-icons-grid">
                                <Link to="/blog" className='social-btn'><Instagram className="ig" /></Link>
                                <Link to="/blog" className='social-btn'><Twitter className="x" /></Link>
                                <Link to="/blog" className='social-btn'><Youtube className="yt" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-meta'>
                    <p className="copyright">&copy; 2025 Camporia. All rights reserved.</p>
                    <div className="footer-legal-links">
                        <Link to="/privacy">Privacy Policy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer