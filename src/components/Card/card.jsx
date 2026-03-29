import './card.css';
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Heart, Star, Trophy } from 'lucide-react';
import { useState } from 'react';

const CampsiteCard = ({ id, imageUrl, campsiteName, price }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="campsite-card" >
        <img src={imageUrl} alt={campsiteName} className="campsite-image" />
        <p className='campsite-info campsite-badge'><Trophy className='lucide-icon' />Popular</p>
        <Heart className='heart-icon' color={isFavorite ? "#ffffff82" : "#ffffffb3"} onClick={toggleFavorite} fill={isFavorite ? "#ff0000ff" : '#00000078'} strokeWidth={1.25} />
        <div>
          <div className="campsite-info">
            <h3 className="campsite-name">{campsiteName}</h3>
            <div className="review-star"><Star fill='#000' strokeWidth={0} className='lucide-icon' />{4.5} <p className='review-count'>(32)</p></div>
          </div>
          <div className="campsite-footer">
            <p className='campsite-location'>Location</p>
            <p className='campsite-amenities'>WiFi • Laundry • Shower</p>
            <p className="campsite-price"><span className='campsite-price-number'>₹{price.toLocaleString('en-US')}</span> <span className='campsite-price-text'>for a night</span></p>
            <button onClick={() => navigate(`/detail/${id}`)} className='campsite-btn-book'>Book</button>
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
