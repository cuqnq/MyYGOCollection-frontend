import { useState, useEffect } from "react";
import "./BottomLeft.css";

function BottomLeft() {
  const [cards, setCards] = useState([]);     // holds card data once fetched
  const [loading, setLoading] = useState(true); // true until fetch finishes
  const [error, setError] = useState(null);    // holds error message, if any

  // Runs once on mount ([] dependency array) to fetch the collection
  useEffect(() => {
    fetch("http://localhost:5000/api/collection")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="bottom-left">
      Loading collection...
      </div>;
  }

  if (error) {
    return <div className="bottom-left">
      Error: {error}
      </div>;
  }

  return (
    <div className="bottom-left">
      <ul className="card-list">
        {cards.map((card) => (
          <li key={card.id} className="card-list-item">
            {card.image_url && (
              <img
                src={card.image_url}
                alt={card.card_name}
                className="card-thumbnail"
              />
            )}
            {card.card_name} — {card.rarity} (x{card.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BottomLeft;