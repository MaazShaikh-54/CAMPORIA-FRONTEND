import "./search.css";
import axios from "axios";
import { useState, useEffect } from "react";
import CampsiteCard from "../Card/card";
import { Search } from "lucide-react";

const CampsiteList = () => {
  const [campsites, setCampsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  // const [numOfGuests, setNumOfGuests] = useState("");

  useEffect(() => {
  const fetchCampsites = async () => {
    try {
      const res = await axios.get("https://camporia-backend.onrender.com/campsites");
      setCampsites(res.data);
    } catch (err) {
      console.error("Error fetching campsites:", err);
    }
  };
  fetchCampsites();
}, []);

  const filtered = campsites.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card-section">
      <div className="searchbox">
        <div className="advanced-search">
          <div className="search-bar">
            <input type="search" name="search" placeholder="Search Destination.." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
            <Search color="#2D6A4F" size={52} strokeWidth={5} className="search-btn" />
          </div>
          {/* <div className="campsite-filter-container">
            <input type="date" name="checkin" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="search-input" />
            <input type="date" name="checkout" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="search-input" />
            <input type="number" name="guests" placeholder="Guests" value={numOfGuests} onChange={(e) => setNumOfGuests(e.target.value)} className="search-input" />
          </div> */}
        </div>
      </div>

      <div className="campsite-card-container">
        {filtered.map((campsite) => (
          <CampsiteCard key={campsite._id} campsite={campsite} />
        ))}
      </div>
    </div>
  );
};

export default CampsiteList;