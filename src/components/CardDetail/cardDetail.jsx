import './cardDetail.css';
import PropTypes from 'prop-types';
import Button from '../Button/button';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { CalendarCheck, CalendarX, MapPin, Heart, Star } from 'lucide-react';
import axios from 'axios';

export default function Detail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [campsite, setCampsite] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false);

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

    const images = Array.isArray(campsite.imageUrl) ? campsite.imageUrl : [campsite.imageUrl];

    return (
        <>
            <div className="detail-container">
                <div className="detail-image-section">
                    <div className="detail-main-image-wrapper">
                        <img src={images[selectedImage]} alt={campsite.name} className="detail-image" />
                        <div className="image-overlay-top">
                            <div className="rating-badge">
                                <Star size={14} fill="#fff" strokeWidth={0} />
                                <span>{campsite.rating || 0}</span>
                            </div>
                            <button className="favorite-btn" onClick={() => setIsFavorite(!isFavorite)} aria-label="Save to favorites">
                                <Heart size={20} fill={isFavorite ? "#e63946" : "transparent"} color={isFavorite ? "#e63946" : "#fff"} strokeWidth={2} />
                            </button>
                        </div>
                    </div>

                    {images.length > 1 && (
                        <div className="detail-preview-images">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Preview ${index + 1}`}
                                    className={`preview-thumb ${selectedImage === index ? 'active-thumb' : ''}`}
                                    onClick={() => setSelectedImage(index)}
                                />
                            ))}
                        </div>
                    )}

                    <div className="reviews-section">
                        <h3 className="reviews-title">Reviews ({campsite.totalReviews || 0})</h3>
                        {campsite.reviews && campsite.reviews.length > 0 ? (
                            campsite.reviews.map((review, index) => (
                                <div key={index} className="review-item">
                                    <div className="review-header">
                                        <span className="review-user">{review.user?.name || "Anonymous"}</span>
                                        <span className="review-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={12} fill={i < review.rating ? "#f4a261" : "transparent"} color={i < review.rating ? "#f4a261" : "#ccc"} strokeWidth={1.5} />
                                            ))}
                                        </span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))
                        ) : (
                            <p className="no-reviews">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>

                <div className="detail-text">
                    <h2 className='title-campsite'>{campsite.name}</h2>
                    <p className='detail-p'><MapPin className='location-icon' /> {campsite.location}</p>
                    <p className='detail-p description'>{campsite.description}</p>
                    <p className='detail-p'><b>Price: </b> <span className='price'>₹{campsite.price.toFixed(2)}</span> per person</p>
                    <p className='detail-amenities'><b>Amenities: </b> {campsite.amenities?.join(', ') || 'None'}</p>
                    <p className='detail-feature'><b>Features: </b> {campsite.feature?.join(', ') || 'None'}</p>
                    <Button className='detail-btn' text="Book" onClick={() => { navigate(`/payment/${id}`) }} />
                    <div className="furth_detail">
                        <li><CalendarCheck className='clock-icon' /><span className='highlight'>Check in:</span> {campsite.checkInTime}</li>
                        <li><CalendarX className='clock-icon' /><span className='highlight'>Check out:</span> {campsite.checkOutTime}</li>
                    </div>
                    <div className='additional-info'>
                        <p className='additional-feature'>Season: {campsite.season}</p>
                        <p className='additional-feature'>Type: {campsite.campsiteType}</p>
                        <p className='additional-feature'>Size: {campsite.campsiteSize}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

Detail.propTypes = {
    campsite: PropTypes.shape({
        name: PropTypes.string,
        imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        description: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        location: PropTypes.string,
        amenities: PropTypes.array,
        feature: PropTypes.array,
        checkInTime: PropTypes.string,
        checkOutTime: PropTypes.string,
        totalReviews: PropTypes.number,
        season: PropTypes.string,
        rating: PropTypes.number,
        campsiteType: PropTypes.string,
        campsiteSize: PropTypes.string,
        reviews: PropTypes.array,
    }),
};