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
                    <div className='footer-logo-tagline'>
                        <div className="footer-logo">
                            <Tent className="tent-logo" size={45} color="#fff" strokeWidth={1.3} />
                            <h1 className="footer-logo-txt">Camporia</h1>
                        </div>
                        <p className="brand-tagline">
                            Your gateway to the wild — curated camping experiences across India.
                        </p>
                    </div>
                    <div className="footer-links">
                        <div>
                            <h2>explore</h2>
                            <ul>
                                <li className="footer-li-items"><Link to="/" id='link'>About</Link></li>
                                <li className="footer-li-items"><Link to="/campsites" id='link'>Campsites</Link></li>
                                <li className="footer-li-items"><Link to="/help" id='link'>Help</Link></li>
                                <li className="footer-li-items"><Link to="/blog" id='link'>Blog</Link></li>
                                <li className="footer-li-items"><Link to="/bookings" id='link'>Bookings</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h2>connect</h2>
                            <div className="footer-icons">
                                <div className="social-icons-grid">
                                    <div className='connect-icon-text'><Link to="/blog" className='social-btn'><Instagram className="ig" /></Link> <p className='icon-text'>Instagram</p></div>
                                    <div className='connect-icon-text'><Link to="/blog" className='social-btn'><Twitter className="x" /></Link> <p className='icon-text'>Twitter</p></div>
                                    <div className='connect-icon-text'><Link to="/blog" className='social-btn'><Youtube className="yt" /></Link> <p className='icon-text'>YouTube</p></div>
                                </div>
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