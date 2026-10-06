import "./BottomLeft.css";

//NOTE: These are the props from App.jsx
// cards = array of card objects from GET/api/collection
// loading = true while APp is still fetching
// error = error message string if the fetch failed, otherwise null

function BottomLeft({cards, loading, error}) {
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