import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/navbar';
import JourneyCard from '../components/JourneyCard/JourneyCard';
import Footer from '../components/Footer/footer';
import Button from '../components/Button/button';
import { useNavigate } from "react-router-dom";
import { getUserJourneys } from "../utils/adminHook.js";

const Journeys = () => {
  const [journeys, setJourneys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJourneys = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await getUserJourneys({
          headers: { Authorization: `Bearer ${token}` }
        });
        setJourneys(res.data);
      } catch (err) {
        console.error("Error fetching journeys:", err);
      }
    };
    fetchJourneys();
  }, []);

  return (
    <>
      <Navbar />
      {journeys.length > 0 ?
        journeys.map((journey) => (
          <JourneyCard key={journey._id} journey={journey} />
        ))
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
  );
};

export default Journeys;