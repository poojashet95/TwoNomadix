import { Link, NavLink } from "react-router-dom";
import { Compass, MapPinned } from "lucide-react";
import { useTrip } from "../context/TripContext";

export default function Navbar() {
  const { trip } = useTrip();

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">
          <Compass size={21} />
        </span>
        <span>Two Nomadix</span>
      </Link>

      <nav className="nav-links">
        <a href="/#destinations">Explore</a>

        <NavLink to="/trip">
          <MapPinned size={17} />
          My Trip
          {trip.length > 0 && (
            <span className="trip-badge">{trip.length}</span>
          )}
        </NavLink>
      </nav>
    </header>
  );
}