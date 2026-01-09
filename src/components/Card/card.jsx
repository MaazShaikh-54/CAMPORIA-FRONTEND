import './card.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
<<<<<<< Updated upstream
import { Heart, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
=======
import { CircleCheck, Star } from "lucide-react";
>>>>>>> Stashed changes

const CampsiteCard = ({ id, imageUrl, campsiteName, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const navigate = useNavigate();

  return (
    <>
<<<<<<< Updated upstream
      <div className="campsite-card" >
=======
      <div className="campsite-card">
        <p className='card-badge'>Popular</p>
        {/* <p style={{fontSize: "20px", backgroundColor: "#d93e3c", color: "#fff", border: "1px solid", padding: "4px", width: "fit-content", borderRadius: "11px"}}>Popular</p> */}
>>>>>>> Stashed changes
        <img src={imageUrl} alt={campsiteName} className="campsite-image" />
        <p className='campsite-info campsite-badge'><Trophy className='lucide-icon' />Popular</p>
        <Heart className='heart-icon' color={isFavorite ? "#ffffff82" : "#ffffffb3"} onClick={toggleFavorite} fill={isFavorite ? "#ff0000ff" : '#00000078'} strokeWidth={1.25} />
        <div>
<<<<<<< Updated upstream
          <div className="campsite-info">
            <h3 className="campsite-name">{campsiteName}</h3>
            <div className="review-star"><Star fill='#000' strokeWidth={0} className='lucide-icon' />{4.5}</div>
          </div>
          <div className="campsite-footer">
            <p className='campsite-amenities'>WiFi • Laundry • Shower</p>
            <p className="campsite-price"><span className='campsite-price-number'>₹{price.toLocaleString('en-US')}</span> <span className='campsite-price-text'>for a night</span></p>
            <button onClick={() => navigate(`/detail/${id}`)} className='campsite-btn-book'>Book</button>
=======
          <h3 className="campsite-name">{campsiteName}</h3>
          <div style={{ gap: "6px", display: "flex", fontSize: "22px", alignItems: "center" }}>< Star fill="#f69e3c" color='#f69a3c' />4.5 / 5</div>
          <div style={{ gap: "6px", display: "flex", fontSize: "22px", alignItems: "center" }}>< CircleCheck color="#a69e9f" />Available</div>
          <div className="campsite-footer">
            <p className="campsite-price ">₹{price} / night</p>
            <button className='goToDetail' onClick={() => navigate(`/detail/${id}`)}> Book now</button>
>>>>>>> Stashed changes
          </div>
        </div>
      </div>
    </>
  );
};

CampsiteCard.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  campsiteName: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default CampsiteCard;
