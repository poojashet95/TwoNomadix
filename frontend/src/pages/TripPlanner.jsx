import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, MapPin, Trash2, Sparkles } from "lucide-react";
import { useTrip } from "../context/TripContext";

export default function TripPlanner() {
  const { trip, removeDestination, clearTrip } = useTrip();

  const totals = trip.reduce(
    (acc, destination) => ({
      attractions: acc.attractions + (destination.attractions?.length || 0),
      hotels: acc.hotels + (destination.hotels?.length || 0),
      restaurants: acc.restaurants + (destination.restaurants?.length || 0),
    }),
    { attractions: 0, hotels: 0, restaurants: 0 }
  );

  if (trip.length === 0) {
    return (
      <main className="section">
        <div className="empty-trip">
          <div className="empty-icon"><CalendarDays size={34} /></div>
          <span className="section-kicker">Your itinerary</span>
          <h1>Your trip is waiting.</h1>
          <p>Explore destinations and add the places you want to visit. We'll keep them together here.</p>
          <Link className="primary-button" to="/">Explore destinations <ArrowRight size={17} /></Link>
        </div>
      </main>
    );
  }

  return (
    <main className="section">
      <div className="trip-header">
        <div>
          <span className="section-kicker">Your itinerary</span>
          <h1>My Karnataka trip</h1>
          <p>{trip.length} destination{trip.length > 1 ? "s" : ""} selected</p>
        </div>
        <button className="ghost-danger" onClick={clearTrip}>Clear trip</button>
      </div>

      <div className="stats-grid">
        <Stat value={totals.attractions} label="Attractions" />
        <Stat value={totals.hotels} label="Hotels" />
        <Stat value={totals.restaurants} label="Restaurants" />
      </div>

      <div className="trip-list">
        {trip.map((destination, index) => (
          <article className="trip-item" key={destination.destination}>
            <div className="trip-number">{String(index + 1).padStart(2, "0")}</div>
            <div className="trip-item-main">
              <div className="eyebrow"><MapPin size={15} /> {destination.state}</div>
              <h2>{destination.destination}</h2>
              <p>{destination.description}</p>
              <div className="mini-list">
                {destination.attractions?.slice(0, 3).map((item) => <span key={item}>{item}</span>)}
              </div>
            </div>
            <div className="trip-actions">
              <Link className="text-link" to={`/destination/${encodeURIComponent(destination.destination)}`}>
                View <ArrowRight size={16} />
              </Link>
              <button className="icon-button danger" onClick={() => removeDestination(destination.destination)} aria-label={`Remove ${destination.destination}`}>
                <Trash2 size={18} />
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="graph-callout">
        <div className="callout-icon"><Sparkles size={21} /></div>
        <div>
          <strong>Why this is a graph-powered planner</strong>
          <p>
            Each destination connects to attractions, categories, activities, hotels and restaurants.
            Those relationships let the application discover related destinations instead of relying only on flat records.
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="stat-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
