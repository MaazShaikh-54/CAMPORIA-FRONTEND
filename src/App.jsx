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
          <Route path="/profile" element={<Profile />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/payment/:id" element={<Payment />} />
        </Routes>
        <ToastContainer />
    </>
  );
};

export default App;
