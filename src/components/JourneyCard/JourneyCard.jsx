import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./JourneyCard.css";

const JourneyCard = ({ journey }) => {
    const navigate = useNavigate();

    return (
        <div className="journey-card">
            <h2 className="journey-card-title">
                {journey.campsite?.name}
            </h2>

            <div className="journey-card-details">
                <p><b>Journey ID:</b> {journey.journeyId}</p>

                <p>
                    <b>Check-In:</b>{" "}
                    {new Date(journey.checkIn).toLocaleDateString("en-IN")}
                </p>

                <p>
                    <b>Check-Out:</b>{" "}
                    {new Date(journey.checkOut).toLocaleDateString("en-IN")}
                </p>

                <p><b>Persons:</b> {journey.personCount}</p>

                <p className="journey-price">
                    <b>Total Price:</b> ₹{journey.totalPrice}
                </p>

                <p>
                    <b>Status:</b>{" "}
                    <span
                        className={`status-badge ${journey.status === "confirmed"
                                ? "status-confirmed"
                                : "status-pending"
                            }`}
                    >
                        {journey.status}
                    </span>
                </p>

                <p>
                    <b>Payment:</b>{" "}
                    <span
                        className={`status-badge ${journey.paymentStatus === "paid"
                                ? "payment-paid"
                                : "payment-pending"
                            }`}
                    >
                        {journey.paymentStatus}
                    </span>
                </p>
            </div>

            <button
                className="journey-btn"
                onClick={() =>
                    navigate(`/detail/${journey.campsite?._id}`)
                }
            >
                View Campsite
            </button>
        </div>
    );
};

JourneyCard.propTypes = {
    journey: PropTypes.shape({
        _id: PropTypes.string,
        journeyId: PropTypes.string,
        checkIn: PropTypes.string,
        checkOut: PropTypes.string,
        personCount: PropTypes.number,
        totalPrice: PropTypes.number,
        status: PropTypes.string,
        paymentStatus: PropTypes.string,
        campsite: PropTypes.shape({
            _id: PropTypes.string,
            name: PropTypes.string,
        }),
    }).isRequired,
};

export default JourneyCard;