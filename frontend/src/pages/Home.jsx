import { useEffect, useState } from "react";
import { Search, Sparkles, ArrowDown } from "lucide-react";
import { getDestinations } from "../services/destinationService";
import DestinationCard from "../components/DestinationCard";
import Loader from "../components/Loader";

export default function Home() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDestinations();
  }, []);

  async function loadDestinations() {
    try {
      setLoading(true);
      setError("");
      setDestinations(await getDestinations());
    } catch {
      setError("We couldn't connect to the travel database. Please check that the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(event) {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      setDestinations(await getDestinations(search.trim()));
    } catch {
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <span className="pill"><Sparkles size={15} /> Graph-powered travel discovery</span>
          <h1>Build a trip around the places you love.</h1>
          <p>
            Explore connected destinations, attractions, stays, food and activities across Karnataka.
          </p>

          <form className="search-box" onSubmit={handleSearch}>
            <Search size={22} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Bangalore, Mysore, Coorg..."
              aria-label="Search destinations"
            />
            <button type="submit">Search</button>
          </form>

          <a className="scroll-hint" href="#destinations">
            Explore destinations <ArrowDown size={16} />
          </a>
        </div>
      </section>

      <section className="section" id="destinations">
        <div className="section-heading">
          <div>
            <span className="section-kicker">Discover</span>
            <h2>Popular destinations</h2>
          </div>
          <span className="result-count">{destinations.length} places</span>
        </div>

        {loading && <Loader />}
        {error && (
          <div className="error-box">
            <strong>Something went wrong</strong>
            <p>{error}</p>
            <button onClick={loadDestinations}>Retry</button>
          </div>
        )}

        {!loading && !error && destinations.length === 0 && (
          <div className="empty-state">No destinations matched your search.</div>
        )}

        {!loading && !error && destinations.length > 0 && (
          <div className="destination-grid">
            {destinations.map((destination) => (
              <DestinationCard key={destination.name} destination={destination} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
