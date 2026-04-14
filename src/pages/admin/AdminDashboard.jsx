import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="admin-dashboard" style={{ color: "#000"}}>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard! Here you can manage users, view reports, and perform administrative tasks.</p>
      </div>
      <Footer />
    </>
  );
}