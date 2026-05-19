import { useState } from 'react';
import Navbar from '../components/Navbar/navbar';
import JourneyCard from '../components/JourneyCard/JourneyCard';
import Footer from '../components/Footer/footer';
import Button from '../components/Button/button';
import { useNavigate } from "react-router-dom";

const Journeys = () => {
  const [journeys, setJourneys] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      {journeys ?
        <JourneyCard />
        :
        <div style={{ height: "19.65vh", display: "block", textAlign: "center", margin: "5% auto" }}>
          <h1 style={{ color: "#91a36f", fontSize: "2rem", marginBottom: "25px" }}>
            No Journeys found!
          </h1>
          <Button className="journeys-cta" text='Book Now' onClick={() => navigate(`/campsites`)} />
        </div>
      }
      <Footer />
    </>
  )
}

export default Journeys;
