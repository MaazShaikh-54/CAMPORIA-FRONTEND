import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";

const Profile = () => {
    return (
        <>
            <Navbar />
            <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h1 style={{color: "#2d6a4f"}}>Profile Page</h1>
            </div>
            <Footer />
        </>
    )
}

export default Profile;