import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Building2, Coffee, MapPin, Plus, Sparkles, Trees,
  Utensils, Check
} from "lucide-react";
import {
  getActivities,
  getDestination,
  getRecommendations,
} from "../services/destinationService";
import { useTrip } from "../context/TripContext";
import RecommendationCard from "../components/RecommendationCard";
import Loader from "../components/Loader";

const images = {
  Bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=85",
  Mysore: "https://images.unsplash.com/photo-1600100397608-f010cbe2f1e9?auto=format&fit=crop&w=1600&q=85",
  Coorg: "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1600&q=85",
  Hampi: "https://images.unsplash.com/photo-1600100397608-f010cbe2f1e9?auto=format&fit=crop&w=1600&q=85",
};

export default function DestinationDetails() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const { trip, addDestination } = useTrip();

  const [destination, setDestination] = useState(null);
  const [activities, setActivities] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const alreadyAdded = trip.some((item) => item.destination === decodedName);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError("");
        const [details, activityData, recommendationData] = await Promise.all([
          getDestination(decodedName),
          getActivities(decodedName),
          getRecommendations(decodedName),
        ]);
        setDestination(details);
        setActivities(activityData);
        setRecommendations(recommendationData);
      } catch {
        setError("Unable to load this destination.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [decodedName]);

  if (loading) return <Loader text="Loading destination..." />;
  if (error) return <div className="section"><div className="error-box">{error}</div></div>;
  if (!destination) return null;

  return (
    <main>
      <section className="detail-hero" style={{ backgroundImage: `url(${images[decodedName] || images.Coorg})` }}>
        <div className="detail-overlay" />
        <div className="detail-content">
          <Link className="back-link" to="/"><ArrowLeft size={17} /> Back to explore</Link>
          <span className="pill"><MapPin size={15} /> {destination.state}</span>
          <h1>{destination.destination}</h1>
          <p>{destination.description}</p>
          <button
            className={`primary-button ${alreadyAdded ? "added" : ""}`}
            onClick={() => addDestination(destination)}
            disabled={alreadyAdded}
          >
            {alreadyAdded ? <><Check size={18} /> Added to trip</> : <><Plus size={18} /> Add to my trip</>}
          </button>
        </div>
      </section>

      <section className="section">
        <div className="detail-grid">
          <InfoSection icon={<Trees />} title="Attractions" items={destination.attractions} />
          <InfoSection icon={<Building2 />} title="Hotels" items={destination.hotels} />
          <InfoSection icon={<Utensils />} title="Restaurants" items={destination.restaurants} />
          <InfoSection
            icon={<Coffee />}
            title="Activities"
            items={activities.flatMap((item) =>
              item.activities.map((activity) => `${activity} · ${item.attraction}`)
            )}
          />
        </div>

        <div className="recommendation-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker"><Sparkles size={15} /> Powered by relationships</span>
              <h2>Destinations you may like</h2>
              <p className="section-description">
                Recommendations are discovered by traversing shared attraction categories in the graph.
              </p>
            </div>
          </div>

          {recommendations.length === 0 ? (
            <div className="empty-state">No related destinations found yet.</div>
          ) : (
            <div className="recommendation-grid">
              {recommendations.map((item) => (
                <RecommendationCard key={item.destination} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function InfoSection({ icon, title, items }) {
  return (
    <section className="info-card">
      <div className="info-title">{icon}<h2>{title}</h2></div>
      {items?.length ? (
        <ul>
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : (
        <p className="muted">No information available.</p>
      )}
    </section>
  );
}
