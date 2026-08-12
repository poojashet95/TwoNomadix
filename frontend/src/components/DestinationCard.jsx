import { ArrowRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const images = {
  Bangalore: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=900&q=80",
  Mysore: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Mysore_Palace,_Mysuru,_Karnataka,_India.jpg",
  Coorg: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Coffee_Plantation_in_Coorg..jpg",
  Hampi: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Hampi_virupaksha_temple.jpg",
};

export default function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <img
        src={images[destination.name] || images.Coorg}
        alt={destination.name}
        className="destination-image"
      />
      <div className="destination-card-body">
        <div className="eyebrow"><MapPin size={15} /> {destination.state}</div>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <Link className="text-link" to={`/destination/${encodeURIComponent(destination.name)}`}>
          Explore destination <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}
