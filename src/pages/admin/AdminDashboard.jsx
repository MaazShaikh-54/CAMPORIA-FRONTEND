import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import { PanelRightOpen, MapPinned, PanelRightClose, LayoutDashboard, TentTree, CalendarCheck, BookUser, BadgeQuestionMark, Newspaper } from "lucide-react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const drawSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const adminModules = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/statistics" },
  { name: "Campsites", icon: MapPinned, path: "/admin/campsites" },
  { name: "Bookings", icon: CalendarCheck, path: "/admin/bookings" },
  { name: "Users", icon: BookUser, path: "/admin/users" },
  { name: "Hosts", icon: TentTree, path: "/admin/hosts" },
  { name: "Blog", icon: Newspaper, path: "/admin/blog" },
  { name: "Support", icon: BadgeQuestionMark, path: "/admin/support" },
];

  return (
    <>
      <Navbar />
      <div className="admin-dashboard" style={{ color: "#000", display: "flex" }}>

        <div className="leftside-bar" style={{ background: "#2d6a4f", height: "100%", width: "auto", display: "block", padding: "20px" }}>

          <div style={{ display: "flex", justifyContent: isSidebarOpen ? "flex-start" : "center", padding: "10px 0px 30px" }}>
            {isSidebarOpen ? <PanelRightOpen onClick={drawSidebar} strokeWidth={1.25} size={25} color="#fff" style={{border: "none" }} /> : <PanelRightClose onClick={drawSidebar} strokeWidth={1.25} size={25} color="#fff" style={{border: "none" }} />}
          </div>

          {isSidebarOpen ? adminModules.map((item, index) => (
            <div key={index} style={{ display: "flex", alignContent: "center", gap: 10, padding: "20px 0" }}>
              <item.icon size={25} strokeWidth={1.25} color="#fff" />
              <p onClick={() => navigate(item.path)} style={{ color: "#fff", fontSize: "20px", fontWeight: "300"}}>{item.name}</p>
            </div>
          )) : adminModules.map((item, index) => (
            <div key={index} style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
              <item.icon onClick={() => navigate(item.path)} size={25} strokeWidth={1.25} color="#fff" />
            </div>
          ))
          }

        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}