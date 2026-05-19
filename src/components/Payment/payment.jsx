import './payment.css'
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import Count from '../Count/count.jsx';
import Navbar from '../Navbar/navbar.jsx';
import Footer from '../Footer/footer.jsx';
import Button from '../Button/button.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [campsite, setCampsite] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [personCount, setPersonCount] = useState(1);
    const [idProofType, setIdProofType] = useState("Passport");
    const [idProofNumber, setIdProofNumber] = useState("");
    const [emergencyContactName, setEmergencyContactName] = useState("");
    const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
    const [medicalInfo, setMedicalInfo] = useState("");

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

    const handleEmergencyPhoneChange = (e) => {
        const value = e.target.value;
        if (!/^\d*$/.test(value)) return;
        if (value.length > 10) return;
        setEmergencyContactPhone(value);
    };

    const submitJourney = async () => {
        if (!checkIn || !checkOut) { alert("Please select check-in and check-out dates"); return false; }
        if (phone.length !== 10) { setError("Phone number must be 10 digits"); return false; }
        if (!idProofNumber.trim()) { setError("ID proof number is required"); return false; }
        if (!emergencyContactName.trim()) { setError("Emergency contact name is required"); return false; }
        if (emergencyContactPhone.length !== 10) { setError("Emergency contact phone must be 10 digits"); return false; }
        try {
            const token = localStorage.getItem("token");
            const journeyData = {
                campsite: id,
                checkIn,
                checkOut,
                personCount,
            };
            const res = await axios.post(
                "https://camporia-backend.onrender.com/journeys/create-journey",
                journeyData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log("Journey submitted:", res.data);
            return true;
        } catch (err) {
            console.error("Error submitting journey:", err);
            alert("Booking failed: " + (err.response?.data?.message || "Unknown error"));
            return false;
        }
    };

    const setBooked = async () => {
        const success = await submitJourney();
        if (!success) return;
        alert("Your adventure awaits!");
        navigate(`/bookings`);
    };

    return (
        <>
            <Navbar />
            <h1 className='pay-heading'>Payment</h1>
            <h1 className='booking-title'>Booking camp at {campsite.name}</h1>
            <div className='payment'>
                <form className="userinfo">

                    <p className="form-section-title">Personal Details</p>
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id='name' placeholder='Your full name' required />
                    <label htmlFor="phone">Phone Number</label>
                    <input type="text" value={phone} onChange={handleChange} id="phone" placeholder='Enter 10-digit phone number' required />

                    <p className="form-section-title">ID Proof</p>
                    <label htmlFor="idprooftype">ID Proof Type</label>
                    <select id="idprooftype" value={idProofType} onChange={(e) => setIdProofType(e.target.value)}>
                        <option value="Passport">Passport</option>
                        <option value="Driver's License">Driver&apos;s License</option>
                        <option value="National ID">National ID</option>
                    </select>
                    <label htmlFor="idproofnumber">ID Proof Number</label>
                    <input type="text" id="idproofnumber" value={idProofNumber} onChange={(e) => setIdProofNumber(e.target.value)} placeholder='Enter ID number' required />

                    <p className="form-section-title">Emergency Contact</p>
                    <label htmlFor="emergencyName">Contact Name</label>
                    <input type="text" id="emergencyName" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} placeholder='Emergency contact full name' required />
                    <label htmlFor="emergencyPhone">Contact Phone</label>
                    <input type="text" id="emergencyPhone" value={emergencyContactPhone} onChange={handleEmergencyPhoneChange} placeholder='Enter 10-digit emergency phone' required />

                    <p className="form-section-title">Medical Info</p>
                    <label htmlFor="medicalInfo">Medical / Allergy Notes</label>
                    <textarea id="medicalInfo" value={medicalInfo} onChange={(e) => setMedicalInfo(e.target.value)} placeholder='Any important medical info or allergies' />

                    <p className="form-section-title">Stay Dates</p>
                    <label htmlFor="checkin">Check-In Date</label>
                    <input type="date" id="checkin" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                    <label htmlFor="checkout">Check-Out Date</label>
                    <input type="date" id="checkout" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />

                    {error && <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>}
                </form>

                <div className="more-options">
                    <Count onCountChange={(count) => setPersonCount(count)} checkIn={checkIn} checkOut={checkOut} />
                    <Button className="pay" type="submit" text="Confirm & Pay" onClick={() => setBooked()} />
                </div>
            </div>
            <Footer />
        </>
    );
}

Payment.propTypes = {
    name: propTypes.string,
    setBooked: propTypes.func,
};

export default Payment;