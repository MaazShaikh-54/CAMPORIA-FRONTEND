import "./search.css";
import Fuse from "fuse.js";
import axios from "axios";
import { useState, useEffect } from "react";
import CampsiteCard from "../Card/card";
import { Search } from "lucide-react";
import { toast } from 'react-toastify';

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const CampsiteList = () => {
  const [campsites, setCampsites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");  
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  // const [checkIn, setCheckIn] = useState("");
  // const [checkOut, setCheckOut] = useState("");
  // const [numOfGuests, setNumOfGuests] = useState("");

  useEffect(() => {
    setSearchResults(shuffleArray(campsites));
  }, [campsites]);

  useEffect(() => {
    if (errorMessage) {
      toast.error('Type something to explore!');
    }
  }, [errorMessage]);

   const fuse = new Fuse(campsites, {
    keys: ["name", "location"],
    includeScore: true,
    threshold: 0.4,
  });

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

  // determine which list to display: prefer explicit searchResults when present
  const displayList = searchResults && searchResults.length ? searchResults : filtered;

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    if (!searchTerm.trim() && !hasSearched) {
      setErrorMessage(true);

      setTimeout(() => {
        setErrorMessage(false);
      }, 4800);

      const inputElement = document.querySelector(".search-input");
      inputElement.classList.add("shake");

      setTimeout(() => {
        setErrorMessage(false);
      }, 5000);

      setSearchResults(shuffleArray(campsites));
      return;
    }

    if (!searchTerm.trim()) {
      setHasSearched(false);
      setSearchResults(shuffleArray(campsites));
      return;
    }

    const results = fuse.search(searchTerm).map((result) => result.item);
    setSearchResults(results.length ? results : ["No data found"]);
    setHasSearched(true);
  };

  return (
    <div className="card-section">
      <div className="searchbox">
        {/* <h1 className="campsite-tagline">Ignite your spirit of exploration</h1> */}
        <div className="advanced-search">
          <div className="search-bar">
            <input
              type="search"
              name="search"
              placeholder="Search Destination.."
              value={searchTerm}
              onChange={handleSearchInput}
              className="search-input"
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
            <Search color="#2D6A4F" size={52} strokeWidth={5} className="search-btn" />
          </div>
          {/* <div className="campsite-filter-container">
            <input type="date" name="checkin" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} className="search-input" />
            <input type="date" name="checkout" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} className="search-input" />
            <input type="number" name="guests" placeholder="Guests" value={numOfGuests} onChange={(e) => setNumOfGuests(e.target.value)} className="search-input" />
          </div> */}
        </div>
      </div>

      {errorMessage && <div className="error-placeholder" />}

      <div className="campsite-card-container">
        {displayList.map((campsite) => (
          <CampsiteCard key={campsite._id} campsite={campsite} />
        ))}
      </div>
    </div>
  );
};

export default CampsiteList;