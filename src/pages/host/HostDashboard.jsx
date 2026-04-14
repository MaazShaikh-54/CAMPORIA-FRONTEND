import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

export default function HostDashboard() {
  return (
    <>
      <Navbar />
      <div className="host-dashboard" style={{ color: "#000"}}>
        <h1>Host Dashboard</h1>
        <p>Welcome to the host dashboard! Here you can manage users, view reports, and perform administrative tasks.</p>
      </div>
      <Footer />
    </>
  );
}