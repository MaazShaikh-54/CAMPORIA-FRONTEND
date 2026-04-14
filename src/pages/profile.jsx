import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import { getUserProfile } from "../utils/profileHook";

const Profile = () => {
    const [user, setUser] = useState({});

    const fetchUserProfile = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await getUserProfile({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUser(res.data);
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ minHeight: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{color: "#2d6a4f"}}>Profile Page</h1>
                <p style={{color: "#2d6a4f"}}>Welcome, {user.name} ({user.role})</p>
                <p style={{color: "#2d6a4f"}}></p>
            </div>
            <Footer />
        </>
    )
}

export default Profile;