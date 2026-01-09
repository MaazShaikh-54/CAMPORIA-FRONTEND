import "./search.css";
import Fuse from "fuse.js";
import { useState, useEffect } from "react";
import CampsiteCard from "../Card/card";
import campsites from "./campsiteData";
import { Search } from "lucide-react";
import { toast } from 'react-toastify';

const shuffleArray = (array) => {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

const CampsiteList = () => {
  const [searchTerm, setSearchTerm] = useState("");
<<<<<<< Updated upstream
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numOfGuests, setNumOfGuests] = useState("");
=======
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numOfPerson, setNumOfPerson] = useState("");
>>>>>>> Stashed changes
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    setSearchResults(shuffleArray(campsites));
  }, []);

  useEffect(() => {
    if (errorMessage) {
      toast.error('Type something to explore!');
    }
  }, [errorMessage]);


  const fuse = new Fuse(campsites, {
    keys: ["campsiteName", "price"],
    includeScore: true,
    threshold: 0.4,
  });

<<<<<<< Updated upstream
  const handleNumOfGuests = (event) => {
    setNumOfGuests(event.target.value);
    setErrorMessage(false);
  };
  const handleCheckIn = (event) => {
    setCheckIn(event.target.value);
    setErrorMessage(false);
  };
  const handleCheckOut = (event) => {
    setCheckOut(event.target.value);
=======
  const handleNumOfPerson = (event) => {
    setNumOfPerson(event.target.value);
    setErrorMessage(false);
  };
  const handleStartDate = (event) => {
    setStartDate(event.target.value);
    setErrorMessage(false);
  };
  const handleEndDate = (event) => {
    setEndDate(event.target.value);
>>>>>>> Stashed changes
    setErrorMessage(false);
  };
  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
    setErrorMessage(false);
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
<<<<<<< Updated upstream
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
            <Search color="#2D6A4F" size={52} strokeWidt h={5} className="search-btn" onClick={handleSearchClick} />
          </div>
          <div className="campsite-filter-container">
            <input
              type="date"
              name="checkin"
              placeholder="Check-in"
              value={checkIn}
              onChange={handleCheckIn}
              className="search-input"
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
            <input
              type="date"
              name="checkout"
              placeholder="Check-out"
              value={checkOut}
              onChange={handleCheckOut}
              className="search-input"
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
            <input
              type="number"
              name="search"
              placeholder="Guests"
              value={numOfGuests}
              onChange={handleNumOfGuests}
              className="search-input"
              onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
            />
          </div>
        </div>
=======
        <input
          type="search"
          name="search"
          placeholder="Search Destination.."
          value={searchTerm}
          onChange={handleSearchInput}
          className="search-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <input
          type="date"
          name="search"
          placeholder="Start date"
          value={startDate}
          onChange={handleStartDate}
          className="search-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <input
          type="date"
          name="search"
          placeholder="End date"
          value={endDate}
          onChange={handleEndDate}
          className="search-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <input
          type="number"
          name="search"
          placeholder="Number of people"
          value={numOfPerson}
          onChange={handleNumOfPerson}
          className="search-input"
          onKeyDown={(e) => e.key === "Enter" && handleSearchClick()}
        />
        <Search color="#555" size={42} strokeWidth={2} className="search-btn" onClick={handleSearchClick} />
>>>>>>> Stashed changes
      </div>

      {errorMessage && <div className="error-placeholder" />}

      <div className="campsite-card-container">
        {searchResults.map((campsite) => (
          <CampsiteCard
            key={campsite.id}
            id={campsite.id}
            imageUrl={campsite.imageUrl}
            campsiteName={campsite.campsiteName}
            price={campsite.price}
          />
        ))}
      </div>
    </div>
  );
};

export default CampsiteList;
