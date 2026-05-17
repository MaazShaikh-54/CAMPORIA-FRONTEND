import './card.css';
import { useNavigate } from "react-router-dom";
import { Heart, Star, Trophy } from 'lucide-react';
import { useState } from 'react';
import PropTypes from 'prop-types';

const CampsiteCard = ({ campsite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  return (
    <div className="campsite-card">
      <img src={Array.isArray(campsite.imageUrl) ? campsite.imageUrl[0] : campsite.imageUrl} alt={campsite.name} className="campsite-image" />
      <p className='campsite-info campsite-badge'><Trophy className='lucide-icon' />Popular</p>
      <Heart className='heart-icon' color={isFavorite ? "#ffffff82" : "#ffffffb3"} onClick={toggleFavorite} fill={isFavorite ? "#ff0000ff" : '#00000078'} strokeWidth={1.25} />
      <div>
        <div className="campsite-info">
          <h3 className="campsite-name" title={campsite.name} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%" }}>{campsite.name}</h3>
          <div className="review-star"><Star fill='#000' strokeWidth={0} className='lucide-icon' />{campsite.rating || 0} <p className='review-count'>({campsite.reviews?.length || 0})</p></div>
        </div>
        <div className="campsite-footer">
          <p className='campsite-location'>{campsite.location}</p>
          <p className='campsite-amenities'>
            {Array.isArray(campsite.amenities)
              ? campsite.amenities.slice(0, 2).join(" • ") + (campsite.amenities.length > 2 ? ` +${campsite.amenities.length - 2}` : "")
              : campsite.amenities}
          </p>
          <p className="campsite-price"><span className='campsite-price-number'>₹{campsite.price.toFixed(2)}</span> <span className='campsite-price-text'>for a night</span></p>
          <button onClick={() => navigate(`/detail/${campsite._id}`)} className='campsite-btn-book'>Book</button>
        </div>
      </div>
    </div>
  );
};

CampsiteCard.propTypes = {
  campsite: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    rating: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    reviews: PropTypes.array,
    location: PropTypes.string,
    amenities: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    price: PropTypes.number,
  }).isRequired,
};

export default CampsiteCard;