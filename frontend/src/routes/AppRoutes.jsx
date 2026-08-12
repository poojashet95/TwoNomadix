import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import DestinationDetails from "../pages/DestinationDetails";
import TripPlanner from "../pages/TripPlanner";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination/:name" element={<DestinationDetails />} />
        <Route path="/trip" element={<TripPlanner />} />
      </Routes>
    </>
  );
}
