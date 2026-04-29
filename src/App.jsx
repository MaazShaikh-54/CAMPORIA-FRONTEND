import './index.css';
import Blog from './pages/blog.jsx';
import Help from './pages/help.jsx';
import Detail from './pages/detail.jsx';
import About from './pages/about.jsx';
import Bookings from './pages/bookings.jsx';
import Profile from './pages/profile.jsx';
import Campsites from './pages/campsites.jsx';
import Payment from './components/Payment/payment.jsx';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminStatistics from './pages/admin/AdminStatistics.jsx';
import AdminCampsites from './pages/admin/AdminCampsites.jsx';
import AdminBookings from './pages/admin/AdminBookings.jsx';
import AdminSupport from './pages/admin/AdminSupport.jsx';
import AdminBlog from './pages/admin/AdminBlog.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx'
import AdminHosts from './pages/admin/AdminHosts.jsx'
import HostDashboard from "./pages/host/HostDashboard.jsx";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/campsites" element={<Campsites />} />
        <Route path="/help" element={<Help />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="statistics" element={<AdminStatistics />} />
            <Route path="campsites" element={<AdminCampsites />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="hosts" element={<AdminHosts />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="support" element={<AdminSupport />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute allowedRoles={["host"]} />}>
          <Route path="/host/statistics" element={<HostDashboard />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
