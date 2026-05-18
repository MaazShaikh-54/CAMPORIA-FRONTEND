import './cardDetail.css';
import PropTypes from 'prop-types';
import Button from '../Button/button';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CalendarCheck, CalendarX } from 'lucide-react';
import axios from 'axios';

export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [campsite, setCampsite] = useState(null);

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

    return (
        <>
            <div className="detail-container">
                <img src={Array.isArray(campsite.imageUrl) ? campsite.imageUrl[0] : campsite.imageUrl} alt={campsite.name} className="detail-image" />
                <div className="detail-text">
                    <h2 className='title-campsite'>{campsite.name}</h2>
                    <p className='detail-p description'>{campsite.description}</p>
                    <p className='detail-p'><b>Price: </b> <span className='price'>₹{campsite.price.toFixed(2)}</span> per person</p>
                    <Button className='detail-btn' text="Book" onClick={() => { navigate(`/payment/${id}`) }} />
                    <div className="furth_detail">
                        <li><CalendarCheck className='clock-icon' /><span className='highlight'>Check in:</span> {campsite.checkin} A.M.</li>
                        <li><CalendarX className='clock-icon' /><span className='highlight'>Check out:</span> {campsite.checkout} A.M.</li>
                        <li></li>
                    </div>
                </div>
            </div>
        </>
    );
}

Detail.propTypes = {
    campsite: PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        campsiteName: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checkin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        checkout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
};