import "./blog.css";
import { Link } from "react-router-dom";
import { ArrowRight, Triangle } from 'lucide-react'

const hero = () => {
  // const text = isDarkMode
  // ? "Explore, relax, and create memories under the stars that last a lifetime."
  // : "Explore, relax, and create memories under endless skies that last a lifetime.";

  return (
    <>
      <div className="home">
        <div className="hero-txt">
          <h1>Immerse yourself in <span style={{ color: "#91a36f" }}>the nature&apos;s beauty</span></h1>
          <p style={{ color: "#2d6a4f", fontSize: "1.5rem", fontFamily: `Elms Sans, sans-serif` }}>Explore, relax, and create memories under endless skies that last a lifetime. </p>
          <div className="hero-image"></div>

          <Link to="/campsites" className="hero-btn">

            <p className="hero-btn-spinner" style={{  }}>

              <svg viewBox="0 0 100 100" className="spinning-svg">

                <path id="circlePath" fill="none" d="M 10, 50 a 40,40 0 1,1 80,0 40,40 0 1,1 -80,0" />

                <text fill="#fff" fontSize="14" fontWeight="600" font-family="Elms Sans, sans-serif" letterSpacing="1px">

                  <textPath href="#circlePath" startOffset="0%" textLength="251" spacing="auto" style={{ textTransform: "uppercase" }}>
                    EXPLORE THE GREAT OUTDOORS &#9679; CAMP NOW &#9679;
                  </textPath>

                </text>

              </svg>

              <Triangle fill="#fff" size={36} />
            </p>
          </Link>
          <div className="camporia-info-container">
            <div className="camporia-info"><p className="numerical-info"><span>10K+</span></p><p className="text-info">Happy <br />campers</p></div>
            <div className="camporia-info"><p className="numerical-info"><span>4.9</span>/5</p><p className="text-info">Google <br /> reviews</p></div>
            <div className="camporia-info"><p className="numerical-info"><span>100</span>%</p><p className="text-info">Eco <br /> friendly</p></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default hero;
