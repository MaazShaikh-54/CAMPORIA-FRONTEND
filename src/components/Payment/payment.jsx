import './payment.css'
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Count from '../Count/count.jsx';
import Navbar from '../Navbar/navbar.jsx';
import Footer from '../Footer/footer.jsx';
import Button from '../Button/button.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = ({ setBooked }) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [campsite, setCampsite] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCampsite = async () => {
            try {
                const res = await axios.get(`https://camporia-backend.onrender.com/campsites/${id}`);
                setCampsite(res.data);
            } catch (err) {
                console.error("Error fetching campsite:", err);
            }
        };
        fetchCampsite();
    }, [id]);

    if (!campsite) {
        return <h2>Destination Not Found!</h2>;
    }

    const handleChange = (e) => {
        const value = e.target.value;

        if (!/^\d*$/.test(value)) return;
        
        if (value.length > 10) return;

        setPhone(value);

        if (value.length === 10) {
            setError("");
        } else {
            setError("Phone number must be 10 digits");
        }
    };

    return (
        <>
            <Navbar />
            <h1 className='pay-heading'>Payment</h1>
            <h1 className='booking-title'>Booking camp at {campsite.name}</h1>
            <div className='payment'>
                <form    className="userinfo">
                    <label htmlFor="name">Full Name: </label>
                    <input type="text" id='name' placeholder='Your name...' required />
                    <label htmlFor="phone">Phone Number: </label>
                    <input type="text" value={phone} onChange={handleChange} id="phone" placeholder='Enter 10-digit phone number' required />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form  >
                <div className="more-options">
                    <Count />
                    <Button className="pay"  type="submit" text="Pay" onClick={()=>setBooked(navigate(`/bookings`), alert("Your adventure awaits!"))} />
                </div>
            </div>
            <Footer />
        </>
    );
}

Payment.propTypes = {
    name: propTypes.string,
    setBooked: propTypes.func.isRequired,
};

export default Payment;