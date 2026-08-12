import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function RecommendationCard({ item }) {
  return (
    <Link className="recommendation-card" to={`/destination/${encodeURIComponent(item.destination)}`}>
      <div>
        <span className="recommendation-label"><Sparkles size={15} /> Graph match</span>
        <h3>{item.destination}</h3>
        <p>
          Similar interests: {item.matching_categories?.join(", ") || "related experiences"}
        </p>
        {item.attractions?.length > 0 && (
          <small>{item.attractions.slice(0, 2).join(" · ")}</small>
        )}
      </div>
      <ArrowRight size={20} />
    </Link>
  );
}
