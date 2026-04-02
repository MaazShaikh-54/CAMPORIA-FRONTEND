import "../components/About/about.css";
import Navbar from "../components/Navbar/navbar";
import Hero from '../components/Blog/hero';
import Footer from "../components/Footer/footer";
import { CircleCheckBig, CircleUserRound } from 'lucide-react';

const About = () => {

    const testimonials = [
        {
            name: "Mustafa Yilmaz",
            text: "An incredible experience! The seamless booking and cozy campsites made my trip unforgettable.",
        },
        {
            name: "Sarah Davis",
            text: "The best way to explore nature without any hassle. The website is intuitive, and the services are top-notch!",
        },
        {
            name: "Avinash Singh",
            text: "Loved every moment of our adventure. The platform made planning so much easier!",
        },
        {
            name: "Param B.",
            text: "I must recommend this site as i had an amazing experience at the campsite with group of friends. They have the best service!",
        },
    ];

    return (
        <>
            <Navbar />
            <Hero />
            <div id="about-container" className="about-container">
                <section className="about-intro">
                    <h1>About Us</h1>
                    <p>
                        We are more than just a campsite booking platform — we are your gateway to adventure.
                        Whether you are craving a peaceful retreat in the mountains or an adrenaline-pumping
                        night under the stars, we help you find the perfect spot.
                    </p>
                </section>

                <section className="mission">
                    <h2>Our Mission</h2>
                    <p>
                        Our goal is simple: To connect nature lovers with unforgettable experiences.
                        We provide easy-to-use tools, verified locations, and user-driven recommendations
                        to make your next outdoor adventure smooth and stress-free.
                    </p>
                </section>

                <section className="why-choose-us">
                    <h2>Why Choose Us?</h2>
                    <ul>
                        <li ><CircleCheckBig color="#7aac3d" strokeWidth={3} /> Hassle-free campsite bookings</li>
                        <li><CircleCheckBig color="#7aac3d" strokeWidth={3} /> Verified and top-rated locations</li>
                        <li><CircleCheckBig color="#7aac3d" strokeWidth={3} /> Secure payment and easy cancellation</li>
                        <li><CircleCheckBig color="#7aac3d" strokeWidth={3} /> User reviews and community-driven recommendations</li>
                    </ul>
                </section>

                <section className="testimonials">
                    <h2>What Our Users Say</h2>
                    <div id="testimonial-list">

                        {testimonials.map((testimonial, index) => (
                            <div className="testimonial" key={testimonial.name || index}>
                                <CircleUserRound strokeWidth={1} size={52} color="#91a36f" />
                                <p className="testimonial-text">"{testimonial.text}"</p>
                                <h4 className="testimonial-author">- {testimonial.name}</h4>
                            </div>
                        ))
                        }
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;
