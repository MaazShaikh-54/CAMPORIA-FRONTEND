import { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import BookingCard from '../components/BookingCard/BookingCard';
import Footer from '../components/Footer/footer';
import Button from '../components/Button/button';
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {bookings ?
        <BookingCard />
        :
        <div style={{ height: "19.65vh", display: "block", textAlign: "center", margin: "5% auto" }}>
          <h1 style={{ color: "#91a36f", fontSize: "2rem", marginBottom: "25px" }}>
            No Bookings found!
          </h1>
          <Button className="bookings-cta" text='Book Now' onClick={() => navigate(`/campsites`)} />
        </div>
      }
      <Footer />
    </>
  )
}

export default Bookings;
