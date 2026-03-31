import "./blog.css";
import { Link } from "react-router-dom";
import { FaChevronCircleDown } from "react-icons/fa";

const hero = () => {
  const scroll = () => {
    document.getElementById("about-container")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="home">
        <div className="hero-txt">
          <h1>Immerse yourself in the nature&apos;s beauty</h1>
          <p>Explore, relax, and create memories under the stars that last a lifetime. </p><br />
          <br />
          <Link to="/campsites" className="hero-btn">
            Book Now!
          </Link>
        </div>
        <FaChevronCircleDown className="large-icon" onClick={scroll} />
      </div>
    </>
  );
};

export default hero;
